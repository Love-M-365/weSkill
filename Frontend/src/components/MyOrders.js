import React, { useEffect, useState } from "react";
import { Button, Card, CardContent } from "./Card";
import { ProgressBar } from "react-bootstrap";
import WeSkillNavbar from "./MainNavbar";
import { useNavigate } from 'react-router-dom'; 
import axios from "axios";

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();
   
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`https://weskill-8iso.onrender.com/api/orders/orders/user/${userId}`);
                setOrders(response.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };
        fetchOrders();
    }, []);

    const handleComment = (profileId) => {
        navigate("/comment", { state: { profileId } });
    };

    // Function to map order status to a progress percentage
    const getProgressPercentage = (status) => {
        switch (status) {
            case "Placed":
                return 20;
            case "In Progress":
                return 50;
            case "Shipped":
                return 80;
            case "Completed":
                return 100;
            default:
                return 0;
        }
    };

    return (
        <>
            <WeSkillNavbar />
            <div className="container mt-4">
                <h2 className="mb-4 text-center fw-bold">My Orders</h2>
                <div>
                    {orders.length === 0 ? (
                        <p className="text-center text-muted">No orders placed yet.</p>
                    ) : (
                        orders.map((order) => (
                            <div key={order.orderId} className="mb-4">
                                <Card className="shadow-sm border rounded-4 p-4 bg-light">
                                    <CardContent>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h5 className="fw-bold mb-1">#{order.orderId}</h5>
                                            <span 
                                                className={`badge ${order.status === "In Progress" ? "bg-warning text-dark" : "bg-success"}`}
                                            >
                                                {order.status}
                                            </span>
                                        </div>

                                        {/* ✅ Progress Bar Based on Order Status */}
                                        <div className="my-3">
                                            <ProgressBar 
                                                now={getProgressPercentage(order.status)} 
                                                label={`${getProgressPercentage(order.status)}%`} 
                                                className="mb-2"
                                            />
                                        </div>

                                        <p className="text-muted mb-3">Assigned to: <strong>{order.profileName}</strong></p>
                                        
                                        {order.status === "Completed" ? (
                                            <div className="d-flex gap-2">
                                                <Button 
                                                    variant="outline-primary" 
                                                    className="w-20" 
                                                    onClick={() => handleComment(order.profileId)}
                                                >
                                                    📝 Comment
                                                </Button>
                                                <Button variant="outline-secondary" className="w-20">🔎 View Work</Button>
                                                <a href={order.receiptUrl} download>
                                                    <Button variant="outline-success" className="w-20">💳 Download Receipt</Button>
                                                </a>
                                            </div>
                                        ) : (
                                            <>
                                                <a href={order.receiptUrl} download>
                                                    <Button variant="outline-success" className="w-20 m-2">💳 Download Receipt</Button>
                                                </a>
                                                <Button variant="primary" className="w-20">💬 Chat with {order.userName}</Button>
                                            </>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default OrdersPage;
