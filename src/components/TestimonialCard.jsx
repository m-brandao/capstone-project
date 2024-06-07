import React from "react";

export default function TestimonialCard({ data }) {
  return (
    <article>
      <p className="rating">Rating - {Math.floor(Math.random() * 10)}/10 ⭐️</p>
      <div className="">
        <img src={data.picture.large} alt={`${data.name.first}`} />
        <h4>
          {data.name.first} {data.name.last[0]}.
        </h4>
      </div>
      <hr />
      <p className="feedback-text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo aperiam
        deserunt odit ea, voluptas neque tempore, doloremque perspiciatis.
      </p>
    </article>
  );
}
