ARG denoVersion=1.18.0
FROM denoland/deno:$denoVersion
ENV DENO_VERSION = $denoVersion
COPY src .
RUN deno cache --unstable --no-check deps.ts && touch count.txt

CMD ["deno", "run", "--no-check", "--unstable", "--allow-net", "--allow-run", "--allow-env", "--allow-write", "main.ts"]
