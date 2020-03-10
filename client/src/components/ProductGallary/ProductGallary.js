import React, { useState } from "react";
import ItemsCarousel from "react-items-carousel";

export default function ProductGallary() {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;
  return (
    <div style={{ padding: `0 ${chevronWidth}px` }}>
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={5}
        gutter={20}
        leftChevron={<button>{"<"}</button>}
        rightChevron={<button>{">"}</button>}
        outsideChevron
        chevronWidth={chevronWidth}
      >
        <div style={{ height: 200, background: "#EEE" }}>First card</div>
        <div style={{ height: 200, background: "#EEE" }}>Second card</div>
        <div style={{ height: 200, background: "#EEE" }}>Third card</div>
        <div style={{ height: 200, background: "#EEE" }}>Fourth card</div>
        <div style={{ height: 200, background: "#EEE" }}>Fifth card</div>
        <div style={{ height: 200, background: "#EEE" }}>Sixth card</div>
        <div style={{ height: 200, background: "#EEE" }}>Seventh card</div>
        <div style={{ height: 200, background: "#EEE" }}>Eigth card</div>
        <div style={{ height: 200, background: "#EEE" }}>Ninth card</div>
      </ItemsCarousel>
    </div>
  );
}
