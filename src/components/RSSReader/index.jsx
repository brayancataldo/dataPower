import React, { useState } from "react";
import { Menu } from "../Menu";

export default function RSSReader() {
  const [rssUrl, setRssUrl] = useState("");
  const [items, setItems] = useState([]);

  const getRss = async (e) => {
    e.preventDefault();
    // const urlRegex =
    //   /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
    // if (!urlRegex.test(rssUrl)) {
    //   return;
    // }
    const res = await fetch(
      `https://api.allorigins.win/get?url=https://news.google.com/rss/search?q=${rssUrl}`
    );
    const { contents } = await res.json();
    const feed = new window.DOMParser().parseFromString(contents, "text/xml");
    const items = feed.querySelectorAll("item");
    const feedItems = [...items].map((el) => ({
      link: el.querySelector("link").innerHTML,
      title: el.querySelector("title").innerHTML,
      date: el.querySelector("pubDate").innerHTML,
      //   author: el.querySelector("author").innerHTML,
    }));
    setItems(feedItems);
    console.log(feedItems);
  };

  return (
      <>
      <Menu/>
      <div>
      <main>
        <form onSubmit={getRss}>
          <div>
            <br />
            <input onChange={(e) => setRssUrl(e.target.value)} value={rssUrl} />
            <input type="submit" />
          </div>
        </form>
        <div style={{ padding: "50px" }}>
          {items.map((item) => {
            return (
              <div>
                <p>{item.date}</p>
                <p>{item.title}</p>
                {/* <p>{item.author}</p> */}
                <a href={item.link} target="_blank">
                  {item.link}
                </a>
              </div>
            );
          })}
        </div>
      </main>
    </div>
    </>
  );
}
