import React, { useEffect, useState } from "react";
import { Button, Card, CardContent } from "./Card";
import { ProgressBar } from "react-bootstrap";
import WeSkillNavbar from "./MainNavbar";
import axios from "axios";

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/orders/orders/${userId}`);
                setOrders(response.data.orders);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, []);

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
                            <div key={order.id} className="mb-4">
                                <Card className="shadow-sm border rounded-4 p-4 bg-light">
                                    <CardContent>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h5 className="fw-bold mb-1">{order.title}</h5>
                                            <span 
                                                className={`badge ${order.status === "In Progress" ? "bg-warning text-dark" : "bg-success"}`}
                                            >
                                                {order.status}
                                            </span>
                                        </div>
                                        <div className="my-3">
                                            <ProgressBar 
                                                now={(order.currentPhase / (order.phases.length - 1)) * 100} 
                                                label={order.phases[order.currentPhase]} 
                                                className="mb-2"
                                            />
                                            <div className="d-flex justify-content-between small text-muted">
                                                {order.phases.map((phase, index) => (
                                                    <span key={index} 
                                                        className={index === order.currentPhase ? "fw-bold text-primary" : ""}
                                                    >
                                                        {phase}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-muted mb-3">Assigned to: <strong>{order.assignedTo}</strong></p>
                                        {order.status === "Completed" ? (
                                            <div className="d-flex gap-2">
                                                <Button variant="outline-primary" className="w-20">📝 Comment</Button>
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
                                                <Button variant="primary" className="w-20">💬 Chat with {order.userId}</Button>
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
