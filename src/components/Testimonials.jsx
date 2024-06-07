import React, { useEffect, useState } from "react";
import TestimonialCard from "./TestimonialCard";

export default function Testimonials() {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://randomuser.me/api/?inc=picture,name,id&results=4"
      );
      const data = await response.json();
      setUserData(() => {
        const newUserData = data.results;
        return newUserData;
      });
    } catch (error) {
      throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return isLoading ? (
    <h3>Loading</h3>
  ) : (
    <section id="testimonials-section">
      <h2>What our costumer have to say about us...</h2>
      <div className="grid">
        {userData &&
          userData.map((user) => (
            <TestimonialCard key={user.id.value} data={user} />
          ))}
      </div>
    </section>
  );
}
