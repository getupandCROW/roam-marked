import run, { lexer } from "../src";
import fs from "fs";

test("Runs Default", () => {
  const md = `- A **bolded** text
- An __italicized__ text
- A ^^highlighted^^ text
- A ~~strikethrough~~ text
- A **bolded ** text
- An __italicized __ text
- __italicized __ text
- A {{[[TODO]]}} This is a todo block
- A {{[[DONE]]}} This is a done block`;

  fs.writeFileSync("debug.json", JSON.stringify(lexer(md), null, 4));
  expect(run(md)).toBe(`<ul>
<li>A <span class="rm-bold">bolded</span> text</li>
<li>An <em class="rm-italics">italicized</em> text</li>
<li>A <span class="rm-highlight">highlighted</span> text</li>
<li>A <del>strikethrough</del> text</li>
<li>A <span class="rm-bold">bolded </span> text</li>
<li>An <em class="rm-italics">italicized </em> text</li>
<li><em class="rm-italics">italicized </em> text</li>
<li>A <span><label class="check-container"><input type="checkbox" disabled=""><span class="checkmark"></span></label></span> This is a todo block</li>
<li>A <span><label class="check-container"><input type="checkbox" checked="" disabled=""><span class="checkmark"></span></label></span> This is a done block</li>
</ul>
`);
});
