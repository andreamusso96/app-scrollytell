import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";

const pageSource = readFileSync(new URL("../src/routes/+page.svelte", import.meta.url), "utf8");

test("uses the outline3 narrative instead of the first draft", () => {
  assert.doesNotMatch(pageSource, /Who gets to disconnect\?/);
  assert.doesNotMatch(pageSource, /Low-income individuals disconnect less from engaging apps/);
  assert.match(pageSource, /Has disconnection become a privilege\?/);
  assert.match(pageSource, /It's 2am on a random Tuesday night in December 2023/);
  assert.match(pageSource, /The empty corner, filled/);
  assert.match(pageSource, /I got out because I could afford to/);
  assert.match(pageSource, /The new one is about who can disconnect/);
});

test("keeps the outline3 story spine in order", () => {
  const orderedBeats = [
    "One more",
    "Escape attempts",
    "Every card in my hand",
    "Nobody knew",
    "First signal: a country's phone traffic",
    "Filling the corner",
    "The gap",
    "Two mountains",
    "One tap",
    "The split",
    "The night",
    "Who can disconnect"
  ];

  let lastIndex = -1;

  for (const beat of orderedBeats) {
    const index = pageSource.indexOf(beat);
    assert.notEqual(index, -1, `Missing beat: ${beat}`);
    assert.ok(index > lastIndex, `Beat out of order: ${beat}`);
    lastIndex = index;
  }
});

test("uses placeholder visuals for every outlined figure direction", () => {
  assert.match(pageSource, /PlaceholderCanvas/);

  for (const visual of [
    "One more.",
    "Atom phone",
    "Bigme\\/HiBreak",
    "Grayscale shorts",
    "The empty corner",
    "Two maps of Paris",
    "26 minutes, compounded",
    "Hour-of-day gap",
    "The app landscape",
    "Install event study",
    "The split",
    "The shape of a day"
  ]) {
    assert.match(pageSource, new RegExp(visual), `Missing placeholder: ${visual}`);
  }
});

test("removes the custom draft visual canvases", () => {
  assert.doesNotMatch(
    pageSource,
    /phone-canvas|detox-canvas|data-canvas|gap-canvas|apps-canvas|split-canvas|disconnection-canvas|ending-canvas|story-canvas/
  );
});

test("does not render implementation notes in the article", () => {
  assert.doesNotMatch(pageSource, /Implementation Notes/);
  assert.doesNotMatch(pageSource, /Text source: <code>outline3\.md<\/code>/);
  assert.doesNotMatch(pageSource, /All visual beats are currently placeholders/);
});

test("does not render the intro eyebrow label", () => {
  assert.doesNotMatch(pageSource, /<p class="eyebrow">One more<\/p>/);
});

test("ships the four paper figures as local static assets", () => {
  for (const figureName of ["figure1.png", "figure2.png", "figure3.png", "figure4.png"]) {
    assert.equal(
      existsSync(new URL(`../static/app-figures/${figureName}`, import.meta.url)),
      true,
      `${figureName} should be available in static/app-figures`
    );
  }
});
