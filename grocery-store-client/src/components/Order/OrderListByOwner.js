import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query"; // Import React Query hooks
import { getOrdersByStoreOwnerApi, completeOrderApi } from "../../api/orderApi"; // Import API calls
import "../../styles/OrderListByOwner.css"; // Import CSS for styling

const StoreOwnerOrders = () => {
    const [message, setMessage] = useState("");

    // שימוש ב-useQuery לשליפת הזמנות
    const { data: orders, error, isLoading, refetch } = useQuery({
        queryKey: ['storeOwnerOrders'],
        queryFn: getOrdersByStoreOwnerApi, // הפונקציה לשליפת ההזמנות
    });

    // שימוש ב-useMutation לעדכון סטטוס ההזמנה
    const mutation = useMutation({
        mutationFn: completeOrderApi, // הפונקציה לעדכון הסטטוס
        onSuccess: () => {
            setMessage("ההזמנה הושלמה בהצלחה!");
            refetch(); // לאחר השינוי בסטטוס, נרצה לשלוף את ההזמנות מחדש
        },
        onError: (error) => {
            setMessage("שגיאה בעדכון הסטטוס: " + error.message);
        }
    });

    const handleCompleteOrder = async (orderId, status) => {
        try {
            await mutation.mutateAsync(orderId, status); // שליחה לעדכון סטטוס ההזמנה
        } catch (error) {
            setMessage("Error completing order: " + error.message);
        }
    };


    if (isLoading) return <p>Loading orders...</p>;
    if (error) return <p>Error fetching orders: {error.message}</p>;

    return (
        <div className="orders-container">
            <h2 className="orders-title">הזמנות בעל המכולת</h2>
            {message && <p className="status-message">{message}</p>}
            <table className="orders-table">
                <thead>
                    <tr>
                        <th>Supplier</th>
                        <th>Date Order</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders?.map((order) => (
                        <tr key={order._id}>
                            <td>{order.supplierName||""}</td>
                            <td>{order.createdAt.split('T')[0]}</td>
                            <td>{order.status}</td>
                            <td>
                                {order.status === "בתהליך" && (
                                    <button
                                        className="complete-btn"
                                        onClick={() => handleCompleteOrder(order._id, "הושלמה")}
                                    >
                                        Complete Order
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StoreOwnerOrders;
