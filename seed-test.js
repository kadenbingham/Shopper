import { assertType, beforeEach } from "vitest";
import rebuildDb from "./db/rebuildDb";

beforeEach(async () => {
  console.log("Rebuilding DB");
  await rebuildDb();
});
