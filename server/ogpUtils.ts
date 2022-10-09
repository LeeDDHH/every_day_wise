'use strict';

import path from 'path';
import fs from 'fs';

import { createCanvas, registerFont, Canvas } from 'canvas';

type SeparatedText = {
  line: string;
  remaining: string;
};

const createTextLine = (canvas: Canvas, text: string): SeparatedText => {
  const context = canvas.getContext('2d');
  const MAX_WIDTH = 1200 as const;

  for (let i = 0; i < text.length; i += 1) {
    const line = text.substring(0, i + 1);

    if (line.match(/\\n/)) {
      const newLine = line.replace('\\n', '');
      return {
        line: newLine,
        remaining: text.substring(i + 1),
      };
    }
    if (context.measureText(line).width > MAX_WIDTH) {
      return {
        line,
        remaining: text.substring(i + 1),
      };
    }
  }

  return {
    line: text,
    remaining: '',
  };
};

const createTextLines = (canvas: Canvas, text: string): string[] => {
  const lines: string[] = [];
  let currentText = text;

  while (currentText !== '') {
    const separatedText = createTextLine(canvas, currentText);
    lines.push(separatedText.line);
    currentText = separatedText.remaining;
  }
  return lines;
};

const createOgp = (id: number, content: string): void => {
  const WIDTH = 1400 as const;
  const HEIGHT = 840 as const;
  const DX = 0 as const;
  const DY = 0 as const;
  const canvas = createCanvas(WIDTH, HEIGHT);

  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#1E212B';
  ctx.fillRect(DX, DY, WIDTH, HEIGHT);

  registerFont(path.resolve('./fonts/MPLUS1p-Regular.ttf'), {
    family: 'M PLUS 1p',
  });
  ctx.font = '60px ipagp';
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const title = content;

  const lines = createTextLines(canvas, title);
  lines.forEach((line, index) => {
    const y = HEIGHT / 2 + 80 * (index - (lines.length - 1) / 2);
    ctx.fillText(line, WIDTH / 2, y);
  });

  const buffer = canvas.toBuffer();

  fs.writeFileSync(path.resolve(`./public/ogp/${id}.png`), buffer);
};

export { createOgp };
