import {
  Application,
  buildUrl,
  Router,
  throwIfUndefined,
  toNumber,
} from "./deps.ts";

const app = new Application();

const countFile = "count.txt";
let viewCount: number;
try {
  viewCount = throwIfUndefined(toNumber(await Deno.readTextFile(countFile)));
  console.log(`loaded viewcount: ${viewCount}`);
} catch (_e) {
  viewCount = 0;
  console.log(`reset viewcount to ${viewCount}`);
}

Deno.addSignalListener("SIGINT", async () => {
  await Deno.writeTextFile(countFile, viewCount.toString());
  console.log(
    `interrupted, updated ${countFile} with current view count: ${viewCount}`,
  );
  Deno.exit();
});

const router = new Router();

router.get("/", async (ctx) => {
  viewCount++;
  const url = buildUrl("https://api.memegen.link", {
    path: [
      "images",
      "custom",
      "why_did_",
      `_${viewCount}_gang_stalker${
        viewCount === 1 ? "" : "s"
      }_view_my_profile_last_night_.jpg`,
    ],
    queryParams: {
      //cringe, the api docs don't show how to post the image and i cbf figuring out how to host the image with oak
      alt: "https://github.com/DetachHead/detachhead/blob/master/funny.png",
    },
  });
  ctx.response.body = (await fetch(url)).body;
});

app.use(router.routes());

await app.listen({ port: 8000 });
