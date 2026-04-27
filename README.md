# 360 Rentals Website

Static marketing website for `www.360rentalsusa.com`.

## Local Preview

Open `index.html` directly in a browser, or run a simple local server:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## GitHub Pages Setup

1. Create a GitHub repo, for example `360rentalsusa-site`.
2. Push this folder to the repo.
3. In GitHub, go to `Settings -> Pages`.
4. Set source to `Deploy from a branch`.
5. Select branch `main` and folder `/root`.
6. Save.
7. In `Settings -> Pages`, set custom domain to:

```text
www.360rentalsusa.com
```

The `CNAME` file is already included.

## DNS Setup

At your domain registrar, add a `CNAME` record:

```text
Type: CNAME
Host: www
Value: funnyman569.github.io
```

Optional apex/root domain forwarding:

```text
360rentalsusa.com -> https://www.360rentalsusa.com
```

GitHub Pages does not use the repo name in the CNAME value. It uses your GitHub Pages host.

## Update Before Launch

- Confirm `hello@360rentalsusa.com` is the right booking email.
- Confirm `(208) 701-4426` is the public phone number.
- Replace remote event photos with your real 360 Rentals booth/event photos when available.
