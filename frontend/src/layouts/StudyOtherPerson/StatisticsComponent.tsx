"use client";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function StatisticsSection() {
    const stats = {
        totalDays: 30,
        completedDays: 21,
        successRate: "70%",
    };

    return (
        <Container>
            <Row>

                    <section className="border-2 border-gray-400 rounded-2xl">
                        <div>
                            <div>
                                <h1>통계</h1>
                            </div>
                        </div>
                    </section>

            </Row>
        </Container>
    );
}
