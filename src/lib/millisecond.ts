const regex = new RegExp(
  "^((?:\\d+)?\\.?\\d+) *(" +
    [
      "milliseconds?",
      "msecs?",
      "ms",
      "seconds?",
      "secs?",
      "s",
      "minutes?",
      "mins?",
      "m",
      "hours?",
      "hrs?",
      "h",
      "days?",
      "d",
      "weeks?",
      "wks?",
      "w",
      "years?",
      "yrs?",
      "y"
    ].join("|") +
    ")?$",
  "i"
);

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;
const year = day * 365;

/**
 * Parse a time string and return the number value of it.
 *
 * @param {String} ms Time string.
 * @returns {Number}
 * @api public
 */
export default function millisecond(ms: string | number) {
  let match;
  let amount;

  if (typeof ms === "number") {
    return ms;
  }

  if (typeof ms !== "string") {
    return 0;
  } else {
    if (!isNaN(+ms)) {
      return +ms;
    }

    //
    // We are vulnerable to the regular expression denial of service (ReDoS).
    // In order to mitigate this we don't parse the input string if it is too long.
    // See https://nodesecurity.io/advisories/46.
    //

    match = regex.exec(ms);
    if (ms.length > 10000 || !match) {
      return 0;
    }

    amount = parseFloat(match[1]);

    switch (match[2].toLowerCase()) {
      case "years":
      case "year":
      case "yrs":
      case "yr":
      case "y":
        return amount * year;

      case "weeks":
      case "week":
      case "wks":
      case "wk":
      case "w":
        return amount * week;

      case "days":
      case "day":
      case "d":
        return amount * day;

      case "hours":
      case "hour":
      case "hrs":
      case "hr":
      case "h":
        return amount * hour;

      case "minutes":
      case "minute":
      case "mins":
      case "min":
      case "m":
        return amount * minute;

      case "seconds":
      case "second":
      case "secs":
      case "sec":
      case "s":
        return amount * second;

      default:
        return amount;
    }
  }
}
