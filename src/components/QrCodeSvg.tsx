import React from 'react';

// Generates a clean, deterministic 2D matrix pseudo-QR code SVG for badges and tickets
export const QrCodeSvg: React.FC<{ value: string; size?: number; className?: string }> = ({
  value,
  size = 120,
  className = ''
}) => {
  // Simple deterministic hash to populate 21x21 grid
  const gridSize = 21;
  const hash = (str: string, seed: number) => {
    let h = seed;
    for (let i = 0; i < str.length; i++) {
      h = Math.imul(31, h) + str.charCodeAt(i) | 0;
    }
    return Math.abs(h);
  };

  // Matrix generation with fixed position detection corners
  const matrix: boolean[][] = Array.from({ length: gridSize }, () => Array(gridSize).fill(false));

  // Function to fill position detection 7x7 patterns in corners
  const fillFinder = (rStart: number, cStart: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (
          r === 0 || r === 6 || c === 0 || c === 6 ||
          (r >= 2 && r <= 4 && c >= 2 && c <= 4)
        ) {
          matrix[rStart + r][cStart + c] = true;
        } else {
          matrix[rStart + r][cStart + c] = false;
        }
      }
    }
  };

  // Fill three corners
  fillFinder(0, 0);
  fillFinder(0, gridSize - 7);
  fillFinder(gridSize - 7, 0);

  // Timing patterns
  for (let i = 8; i < gridSize - 8; i++) {
    matrix[6][i] = i % 2 === 0;
    matrix[i][6] = i % 2 === 0;
  }

  // Populate data cells
  let seed = 42;
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      // Don't overwrite finders or timing
      const inTopLeft = r < 8 && c < 8;
      const inTopRight = r < 8 && c >= gridSize - 8;
      const inBottomLeft = r >= gridSize - 8 && c < 8;
      const inTiming = r === 6 || c === 6;

      if (!inTopLeft && !inTopRight && !inBottomLeft && !inTiming) {
        seed = hash(value + `${r}-${c}`, seed);
        matrix[r][c] = (seed % 3) === 0 || (seed % 5) === 0;
      }
    }
  }

  const cellSize = size / gridSize;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`bg-white p-2 rounded-lg shadow-inner ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width={size} height={size} fill="#ffffff" rx={6} />
      {matrix.map((row, r) =>
        row.map((cell, c) =>
          cell ? (
            <rect
              key={`${r}-${c}`}
              x={c * cellSize}
              y={r * cellSize}
              width={cellSize + 0.2}
              height={cellSize + 0.2}
              fill="#090d16"
            />
          ) : null
        )
      )}
    </svg>
  );
};
