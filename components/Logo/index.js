import { useEffect, useRef } from "react";
import * as React from "react";
import PropTypes from "prop-types";
import { gsap } from "gsap";

// The SVG coordinates are inverted,
// so we need to invert the max and min values
const maxMinValues = {
  L: {
    max: 32,
    min: 150,
  },
  B: {
    max: 45,
    min: 140,
  },
};

const Logo = ({
  alt,
  className,
  color = {
    axis: "#ffffff",
    bars: ["#8dc9e6", "#50b693", "#e8476f", "#fdd068"],
    letters: "#ffffff",
  },
  isAnimated = false,
}) => {
  const elbecRef = useRef();
  const eRef = useRef();
  const e2Ref = useRef();
  const cRef = useRef();
  const bRef = useRef();
  const axisXRef = useRef();
  const axisYleftRef = useRef();
  const axisYrightRef = useRef();
  const bar1BRef = useRef();
  const bar2BRef = useRef();
  const bar1LRef = useRef();
  const bar2LRef = useRef();
  const bar3LRef = useRef();

  const axis = [axisXRef, axisYleftRef, axisYrightRef];

  const RandomBars = ({ colors }) => {
    const shuffleColors = colors.sort(() => Math.random() - 0.5);

    const randomValueBar = (letter) => {
      const {
        [letter]: { max, min },
      } = maxMinValues;
      const value = Math.floor(Math.random() * (max - min + 1)) + min;

      return letter === "B"
        ? `M188 ${value}H166V160H188V${value}Z`
        : `M148 ${value}H125V160H148V${value}Z`;
    };

    // Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: "base",
    });
    const [bar2LValue, bar3LValue] = [
      randomValueBar("L"),
      randomValueBar("L"),
    ].sort(collator.compare);
    const bar2BValue = randomValueBar("B");

    return (
      <>
        <path
          ref={bar1BRef}
          d="M188 34H166V160H188V34Z"
          fill={shuffleColors[3]}
        />
        <path ref={bar2BRef} d={bar2BValue} fill={shuffleColors[2]} />
        <path
          ref={bar1LRef}
          d="M148 20H125V160H148V20Z"
          fill={shuffleColors[1]}
        />
        <path ref={bar2LRef} d={bar2LValue} fill={shuffleColors[3]} />
        <path ref={bar3LRef} d={bar3LValue} fill={shuffleColors[0]} />
      </>
    );
  };

  const logoAnimation = () => {
    axis.forEach((ref) => {
      ref.current.style.opacity = 1;
    });
    gsap.from(axisXRef.current, {
      delay: 0.2,
      scale: 0,
    });
    gsap.from(axisYleftRef.current, {
      transformOrigin: "100%",
      delay: 0.2,
      scale: 0,
    });
    gsap.from(axisYrightRef.current, {
      delay: 0.2,
      scale: 0,
    });

    const tl = gsap.timeline();

    tl.to(eRef.current, { x: 20, opacity: 0, duration: 0 }, 0)
      .to(e2Ref.current, { x: -20, opacity: 0, duration: 0 }, 0)
      .to(cRef.current, { x: -20, opacity: 0, duration: 0 }, 0)
      .to(bRef.current, { x: -20, opacity: 0, duration: 0 }, 0)
      .to(bar2LRef.current, { x: -80, opacity: 0, y: "+=100%", duration: 0 }, 0)
      .to(bar1LRef.current, { x: -10, opacity: 0, y: "+=100%", duration: 0 }, 0)
      .to(bar3LRef.current, { x: 60, opacity: 0, y: "+=100%", duration: 0 }, 0)
      .to(bar1BRef.current, { x: 100, opacity: 0, y: "+=100%", duration: 0 }, 0)
      .to(bar2BRef.current, { x: 180, opacity: 0, y: "+=100%", duration: 0 }, 0)
      .to(
        bar2LRef.current,
        { y: "-=100%", opacity: 1, duration: 0.5, delay: 0.5 },
        0
      )
      .to(
        bar1LRef.current,
        { y: "-=100%", opacity: 1, duration: 0.5, delay: 0.5 },
        0
      )
      .to(
        bar3LRef.current,
        { y: "-=100%", opacity: 1, duration: 0.5, delay: 0.5 },
        0
      )
      .to(
        bar1BRef.current,
        { y: "-=100%", opacity: 1, duration: 0.5, delay: 0.5 },
        0
      )
      .to(
        bar2BRef.current,
        { y: "-=100%", opacity: 1, duration: 0.5, delay: 0.5 },
        0
      )
      .to(bar2LRef.current, { x: 0, duration: 0.5, delay: 0.6 }, 0.6)
      .to(bar1LRef.current, { x: 0, duration: 0.5, delay: 0.6 }, 0.6)
      .to(bar3LRef.current, { x: 0, duration: 0.5, delay: 0.6 }, 0.6)
      .to(bar1BRef.current, { x: 0, duration: 0.5, delay: 0.6 }, 0.6)
      .to(bar2BRef.current, { x: 0, duration: 0.5, delay: 0.6 }, 0.6)
      .to(axisXRef.current, { scale: 0, duration: 0.4, delay: 0.7 }, 1)
      .to(axisYleftRef.current, { scale: 0, duration: 0.4, delay: 0.7 }, 1)
      .to(axisYrightRef.current, { scale: 0, duration: 0.4, delay: 0.7 }, 1)
      .to(eRef.current, { x: 0, opacity: 1, duration: 0.35, delay: 0.8 }, 1)
      .to(bRef.current, { x: 0, opacity: 1, duration: 0.35, delay: 0.8 }, 1)
      .to(e2Ref.current, { x: 0, opacity: 1, duration: 0.35, delay: 0.9 }, 1)
      .to(cRef.current, { x: 0, opacity: 1, duration: 0.35, delay: 1 }, 1);
  };

  useEffect(() => {
    isAnimated && logoAnimation();
  }, [isAnimated]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <svg
      className={className}
      viewBox="0 0 432 162"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{alt}</title>
      <g ref={elbecRef}>
        <path
          ref={eRef}
          d="M51.3995 150.346C45.1274 143.203 41.9942 133.213 42 120.375C42 111.529 43.6087 103.708 46.8261 96.913C49.6979 90.4734 54.3441 84.9797 60.224 81.0716C66.0469 77.3339 72.8485 75.3989 79.7719 75.5102C89.6446 75.5102 96.9418 78.5284 101.663 84.5649C106.385 90.6014 108.74 97.9326 108.728 106.559C108.728 112.311 108.147 116.184 106.986 118.177C105.824 120.17 103.742 121.166 100.74 121.166H59.3528C59.3528 129.468 61.2926 136.081 65.172 141.005C69.0514 145.929 75.3757 148.391 84.145 148.391C87.6497 148.446 91.1513 148.155 94.5984 147.522C96.9617 147.079 99.2905 146.469 101.567 145.697C102.599 145.363 103.602 144.945 104.564 144.446L107.056 149.929C107.056 150.155 105.758 151.233 103.144 153.162C100.007 155.387 96.5964 157.201 92.9956 158.558C88.5118 160.278 83.739 161.125 78.9357 161.052C66.8445 161.052 57.6628 157.484 51.3907 150.346H51.3995ZM91.9154 111.242C92.2538 109.157 92.4198 107.047 92.4119 104.934C92.4119 98.5148 91.3579 93.8108 89.2497 90.8215C87.1416 87.8322 83.2739 86.326 77.6464 86.3028C71.4324 86.3028 66.8851 88.5448 64.0046 93.0287C61.1241 97.5126 59.5735 104.013 59.3528 112.529L91.9154 111.242Z"
          fill={color.letters}
        />
        <path
          ref={e2Ref}
          d="M258.788 150.346C252.516 143.203 249.383 133.213 249.388 120.375C249.388 111.529 250.997 103.709 254.214 96.9131C257.094 90.4972 261.74 85.028 267.612 81.1412C273.435 77.4035 280.237 75.4684 287.16 75.5797C297.033 75.5797 304.327 78.598 309.043 84.6345C313.759 90.671 316.116 98.0022 316.116 106.628C316.116 112.381 315.536 116.254 314.374 118.246C313.213 120.239 311.131 121.236 308.128 121.236H266.68C266.68 129.537 268.62 136.15 272.499 141.074C276.379 145.999 282.703 148.461 291.472 148.461C294.977 148.517 298.479 148.226 301.926 147.592C304.289 147.149 306.618 146.539 308.895 145.767C309.926 145.431 310.928 145.013 311.892 144.516L314.383 149.999C314.383 150.225 313.079 151.302 310.472 153.231C307.335 155.457 303.924 157.27 300.323 158.628C295.839 160.347 291.066 161.194 286.263 161.122C274.166 161.122 264.984 157.553 258.718 150.416L258.788 150.346ZM299.243 111.312C299.581 109.226 299.747 107.116 299.739 105.003C299.739 98.5844 298.685 93.8804 296.577 90.8911C294.469 87.9018 290.601 86.3724 284.974 86.3029C278.766 86.3029 274.215 88.5449 271.323 93.0288C268.431 97.5127 266.883 104.013 266.68 112.529L299.243 111.312Z"
          fill={color.letters}
        />
        <path
          ref={cRef}
          d="M387.174 153.866C384.166 155.928 380.893 157.577 377.444 158.767C373.037 160.321 368.388 161.08 363.715 161.009C352.285 161.009 343.354 157.55 336.919 150.633C330.484 143.716 327.267 133.616 327.267 120.332C327.267 111.486 328.846 103.665 332.006 96.8697C334.855 90.4342 339.507 84.9572 345.404 81.0978C351.373 77.3351 358.318 75.4014 365.378 75.5364C373.468 75.5364 379.929 77.5293 384.761 81.515C389.593 85.5007 392.006 90.4799 392 96.4527C392.046 98.659 391.241 100.799 389.752 102.431C388.254 104.091 385.902 104.925 382.679 104.925C381.414 104.968 380.15 104.797 378.942 104.421C377.992 104.091 377.409 103.874 377.2 103.761L374.368 87.9888C373.442 87.5714 372.463 87.2792 371.459 87.1198C369.306 86.5987 367.097 86.3476 364.882 86.3725C357.332 86.3725 352.065 88.7796 349.08 93.5937C346.095 98.4078 344.596 106.405 344.585 117.586C344.585 128.761 346.58 136.701 350.569 141.405C354.559 146.109 361.107 148.461 370.213 148.461C373.13 148.472 376.043 148.248 378.924 147.792C381.117 147.469 383.285 146.998 385.414 146.384C386.461 146.091 387.488 145.731 388.489 145.306L390.824 150.946C390.824 151.172 389.596 152.171 387.157 153.935"
          fill={color.letters}
        />
        <path
          ref={bRef}
          d="M230.912 84.6432C225.36 78.5604 218.04 75.516 208.951 75.5103C204.092 75.3932 199.265 76.3301 194.804 78.2562C191.398 79.7218 188.209 81.6456 185.326 83.9741L185.648 90.4566C190.773 88.8785 196.097 88.0387 201.459 87.9627C208.782 87.9627 213.969 90.2597 217.017 94.8537C220.066 99.4477 221.594 107.112 221.6 117.847C221.6 129.462 219.823 137.761 216.268 142.743C212.714 147.725 207.487 150.216 200.588 150.216C195.463 150.194 190.385 149.237 185.605 147.392L184.272 153.701C189.377 158.463 195.811 160.844 203.576 160.844C209.91 160.877 216.1 158.962 221.303 155.36C226.687 151.711 231.014 146.288 234.283 139.093C237.553 131.898 239.19 123.156 239.196 112.868C239.196 100.123 236.42 90.7144 230.868 84.6432"
          fill={color.letters}
        />
        <RandomBars colors={color.bars} />
        <path
          ref={axisXRef}
          d="M1 161H431"
          stroke={color.axis}
          style={{ opacity: 0 }}
        />
        <path
          ref={axisYleftRef}
          d="M1 161L1 0"
          stroke={color.axis}
          style={{ opacity: 0 }}
        />
        <path
          ref={axisYrightRef}
          d="M431 161L431 0"
          stroke={color.axis}
          style={{ opacity: 0 }}
        />
      </g>
    </svg>
  );
};

Logo.displayName = "ElbecLogo";
Logo.propTypes = {
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  color: PropTypes.shape({
    axis: PropTypes.string,
    bars: PropTypes.array,
    letters: PropTypes.string,
  }),
  isAnimated: PropTypes.bool,
};

export { Logo };
