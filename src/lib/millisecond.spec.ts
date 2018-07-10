import { test } from "ava";

import ms from "./millisecond";

test("should parse numbers", t => {
  t.is(ms(100), 100);
});

test("should return 0 if the input is not a string or number", t => {
  // @ts-ignore
  t.is(ms([10]), 0);
});

test("should preserve strings that represent numbers", t => {
  t.is(ms("100"), 100);
  t.is(ms("10"), 10);
  t.is(ms("1"), 1);
  t.is(ms("0"), 0);
});

test("should return 0 if the input string represents 0", t => {
  t.is(ms("000.00"), 0);
  t.is(ms("000000"), 0);
  t.is(ms(""), 0);
});

test("should bail out if the input string is too long", t => {
  let i = 0;
  let str = "";

  for (; i < 10000; i++) {
    str += "5";
  }
  str += " minutes";

  t.is(ms(str), 0);
});

test("should return 0 if invalid", t => {
  t.is(ms("Hello mom"), 0);
});

test("should convert ms to ms", t => {
  t.is(ms("100ms"), 100);
});

test("should convert s to ms", t => {
  t.is(ms("1s"), 1000);
  t.is(ms("1sec"), 1000);
  t.is(ms("1secs"), 1000);
  t.is(ms("1second"), 1000);
  t.is(ms("1seconds"), 1000);
});

test("should convert from m to ms", t => {
  t.is(ms("1m"), 60000);
  t.is(ms("1min"), 60000);
  t.is(ms("1mins"), 60000);
  t.is(ms("1minute"), 60000);
  t.is(ms("1minutes"), 60000);
});

test("should convert from h to ms", t => {
  t.is(ms("1h"), 3600000);
  t.is(ms("1hr"), 3600000);
  t.is(ms("1hrs"), 3600000);
  t.is(ms("1hour"), 3600000);
  t.is(ms("1hours"), 3600000);
});

test("should convert d to ms", t => {
  t.is(ms("2d"), 172800000);
  t.is(ms("2day"), 172800000);
  t.is(ms("2days"), 172800000);
});

test("should convert w to ms", t => {
  t.is(ms("1w"), 604800000);
  t.is(ms("1wk"), 604800000);
  t.is(ms("1wks"), 604800000);
  t.is(ms("1week"), 604800000);
  t.is(ms("1weeks"), 604800000);
});

test("should convert y to ms", t => {
  t.is(ms("1y"), 31536000000);
  t.is(ms("1yr"), 31536000000);
  t.is(ms("1yrs"), 31536000000);
  t.is(ms("1year"), 31536000000);
  t.is(ms("1years"), 31536000000);
});

test("should work with decimals", t => {
  t.is(ms("1.5h"), 5400000);
});

test("should work with multiple spaces", t => {
  t.is(ms("1   s"), 1000);
});

test("should be case-insensitive", t => {
  t.is(ms("1.5H"), 5400000);
});

test("should work with numbers starting with .", t => {
  t.is(ms(".5ms"), 0.5);
});
