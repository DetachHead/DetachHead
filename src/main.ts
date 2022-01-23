import { Application, buildUrl, Router } from "./deps.ts";

const app = new Application();

//TODO: store this in some sort of persistent storage
let viewCount = 0;

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
      alt:
        "https://raw.githubusercontent.com/DetachHead/detachhead/master/funny.png",
    },
  });
  ctx.response.body = (await fetch(url)).body;
  ctx.response.headers.set(
    "Cache-Control",
    "max-age=0, no-cache, no-store, must-revalidate",
  );
});

app.use(router.routes());

await app.listen({ port: 8000 });
