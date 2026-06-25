import { forwardRef, memo } from 'react';

const Character = memo(forwardRef(function Character(_props, ref) {
  return (
    <div className="hero-character-wrap">
      <div ref={ref} className="character-float">
        <img
          src="/Yashank.png"
          alt="Yashank Gupta"
          className="hero-character-img"
          loading="lazy"
        />
      </div>
    </div>
  );
}));

export default Character;
