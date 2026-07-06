'use client';

export default function Cursor() {
  return (
    <>
      <div className="cursor-wrap">
        <div id="cursorStyle" className="cursor-dot-outline"></div>
        <div id="cursorAsset" className="cursor-dot"></div>
      </div>
      <div id="circle"></div>
    </>
  );
}
