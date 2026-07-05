<script lang="ts">
  import { onMount } from "svelte";
  import PlaceholderCanvas from "$lib/components/PlaceholderCanvas.svelte";
  import ProseSection from "$lib/components/ProseSection.svelte";
  import StickyScene from "$lib/components/StickyScene.svelte";

  type Step = {
    id: string;
    kicker: string;
    title: string;
    body: string;
    accentColor?: string;
  };

  type VisualScene = {
    id: string;
    label: string;
    note: string;
    steps: Step[];
    pinDurationVh?: number;
  };

  type ProseBlock = {
    id: string;
    kind: "prose";
    heading?: string;
    paragraphs: string[];
  };

  type VisualBlock = {
    id: string;
    kind: "visual";
    scene: VisualScene;
  };

  type ContentBlock = ProseBlock | VisualBlock;

  const accent = {
    gold: "#e2ad42",
    green: "#33b36b",
    purple: "#8f5cc2",
    red: "#ff5c45",
    blue: "#6372ff"
  };

  let articleProgress = 0;

  function updateArticleProgress() {
    if (typeof window === "undefined") {
      return;
    }

    const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;

    articleProgress =
      scrollableHeight <= 0 ? 0 : Math.min(Math.max(scrollTop / scrollableHeight, 0), 1);
  }

  onMount(() => {
    updateArticleProgress();
  });

  function placeholderScene(
    id: string,
    label: string,
    note: string,
    body: string,
    accentColor = accent.gold
  ): VisualBlock {
    return {
      id,
      kind: "visual",
      scene: {
        id,
        label,
        note,
        pinDurationVh: 230,
        steps: [
          {
            id: `${id}-placeholder`,
            kicker: "Placeholder",
            title: label,
            body,
            accentColor
          }
        ]
      }
    };
  }

  const introParagraphs = [
    `It's 2am on a random Tuesday night in December 2023. I look up from my phone. My head pounds. My eyes burn. My thoughts race, and I feel anxious. I have to wake up early tomorrow - I have things to do. But I can't stop. I've been scrolling shorts for three hours. People playing basketball. Cats. Catchy music. My inner voice keeps saying: one more. One more, and then sleep.`
  ];

  const contentBlocks: ContentBlock[] = [
    placeholderScene(
      "one-more",
      "One more.",
      "Reader scrolls through 2-3 fake shorts before reaching the next paragraph. The interaction should mirror the compulsive loop.",
      "A fake shorts feed that forces a few scrolls before release.",
      accent.red
    ),
    {
      id: "one-more-after",
      kind: "prose",
      paragraphs: [
        `This was not the first time. I'd been wrestling with it for a while. Time is the scarcest thing I have - there are never enough hours for the ideas I actually want to build - and here I was, donating it to an algorithm, three hours at a stretch.`
      ]
    },
    {
      id: "escape-attempts-start",
      kind: "prose",
      heading: "Escape attempts",
      paragraphs: [
        `I tried the obvious fix first: going back to a Nokia. A dumbphone. It collapsed within days. The smartphone became basic infrastructure in one generation. My mother grew up without one. Today, banking, transport, tickets, maps and WhatsApp all run through it. Opting out of the smartphone means opting out of a lot of ordinary life.`,
        `Then I tried blockers. I never found one that held. There's no real commitment - and there's always a leak. Block the app, and the browser is still there. Block YouTube, and you find yourself watching shorts on Reddit. (Yes, they have them there too.) Eventually they get you, because some part of you is looking for it.`,
        `So I tried something more radical. I have the same problem with food: when it's in front of me, I eat it; when it's out of sight, I forget it exists. Maybe scrolling worked the same way - maybe I just needed a physical barrier. I found the Atom, a phone roughly the size of a credit card.`
      ]
    },
    placeholderScene(
      "atom-phone",
      "Atom phone",
      "Photo placeholder for the tiny Atom phone, roughly credit-card sized.",
      "A product photo or simple cutout should make the scale immediately obvious.",
      accent.blue
    ),
    {
      id: "escape-attempts-middle",
      kind: "prose",
      paragraphs: [
        `The theory: nobody watches videos on a screen this small. The practice: after a short adjustment period, I did. Also, the Atom constantly overheated and the battery died in hours. The whole experience was so cumbersome that after three months I gave up and went back to my iPhone.`,
        `Then I thought: maybe I could live with no data plan, and no internet at home. Maybe that was a barrier big enough. Within a few months, I knew the wifi passwords of half the places in Zurich. I had built an impressively detailed mental map of hotspot coverage along my usual routes. I started spending my evenings at the office, taking walks that bent toward open networks, lingering outside cafes. The tipping point came one winter night. I was sitting on the pavement outside a bar near my house - good wifi, that one. Snow everywhere. Freezing. Scrolling. My inner voice crying: just one more.`,
        `Somewhere between the snowflakes and the shorts, I had to admit this wasn't working either. I tried another dozen things - lockboxes, having my girlfriend set the screen-time codes, leaving my phone at the office. None stuck. Until I stumbled onto something that did: e-ink phones. It turns out color is crucial for dopamine. Watching shorts in grayscale just isn't that rewarding. And there are decent e-ink phones out there now. The experience is worse than a normal phone - but that's kind of the point. And it's not that bad.`,
        `This one is working. For now.`
      ]
    },
    placeholderScene(
      "bigme-hibreak",
      "Bigme/HiBreak",
      "Photo placeholder for the e-ink phone that finally helped.",
      "Show the actual device plainly, not as a polished product ad.",
      accent.green
    ),
    placeholderScene(
      "grayscale-shorts",
      "Grayscale shorts",
      "The opening fake shorts feed returns in grayscale and choppy frame rate.",
      "Same feed as the opening, but now visually degraded so the dopamine point lands instantly.",
      accent.purple
    ),
    {
      id: "every-card",
      kind: "prose",
      heading: "Every card in my hand",
      paragraphs: [
        `At some point it struck me how hard this had been. Two years. Five devices. Over EUR 2,000. A very patient girlfriend. A clear diagnosis and a clear motive. A flexible job - a PhD in Switzerland - that left me time and energy to run experiments on my own life. Offline hobbies, quiet spaces, friends to meet. Money to spend in cafes, theaters, restaurants, cinemas. Every card was in my hand. And I still barely made it out.`,
        `So what happens to someone holding none of those cards? Imagine a job that demands constant availability. Fewer affordable offline alternatives. Less private space. More exhaustion at the end of the day - with the couch free and the feed right there. Is "digital detox" still a realistic individual project?`,
        `Or has disconnection become a privilege of those who, like me, drew a lucky ticket in the birth lottery?`
      ]
    },
    {
      id: "nobody-knew",
      kind: "prose",
      heading: "Nobody knew",
      paragraphs: [
        `Here's the thing: nobody actually knew the answer.`,
        `People had studied phone use, of course. But every study hit one of two walls. The big studies were surveys - they ask you how much time you spent on your phone last week, and on which apps. I challenge you to answer that without peeking at your stats. I find it close to impossible. Phone behavior is so habitual, so ingrained, that it slips out of memory as it happens. You answer whatever your brain finds acceptable, and that is often far from the truth [link to meta-analysis].`,
        `The other studies did track phones directly. But they tracked maybe a few dozen people, usually university students, usually paid to participate. Can that answer a question about income and inequality? Probably not.`,
        `So the evidence had scale without granularity, or granularity without scale. The corner where an answer would live - millions of people, behavior logged by the second - was empty.`
      ]
    },
    placeholderScene(
      "empty-corner",
      "The empty corner",
      "Two-axis plane: scale on x, granularity on y. Surveys are big but blurry; tracking studies are sharp but small; top-right is a question mark.",
      "A simple scale-vs-granularity explainer showing the missing evidence corner.",
      accent.gold
    ),
    {
      id: "first-signal",
      kind: "prose",
      heading: "First signal: a country's phone traffic",
      paragraphs: [
        `A string of coincidences then put an answer within reach. I was a PhD student in computational social science at ETH Zurich when I read on Twitter about the NetMob data challenge: Orange, one of France's biggest telecom operators, would share app-level mobile traffic for twenty French metropolitan areas, at the resolution of city blocks. For the first time, the scale was there. I applied with exactly the idea you'd expect: map how rich and poor neighborhoods use their phones.`,
        `The data was hard to work with - anonymized and aggregated to the point that only relative measures survived. No absolute numbers, only shares. But a signal came through anyway. Lower-income areas show higher traffic shares for exactly the apps you'd suspect of sucking people in - the YouTubes and Facebooks of the world - and lower shares for the LinkedIns and the Maps.`,
        `Night-time use is unequally distributed too. Low-income areas concentrate more of their activity late at night - the hours when it's hardest to stop scrolling.`
      ]
    },
    placeholderScene(
      "paris-maps",
      "Two maps of Paris",
      "Swipe-slider placeholder: income vs Facebook share, then same interaction crossfades to income vs night-time activity.",
      "The repeated map interaction should show the income pattern coming through different phone-use layers.",
      accent.green
    ),
    {
      id: "first-signal-after",
      kind: "prose",
      paragraphs: [
        `The overlap between these maps was staggering. But I couldn't fully trust it. This was traffic, not screen time. Tiles, not people. Shares, not minutes. And a dozen other small caveats. The only honest test was replication in a completely different dataset. But where would I ever find one?`
      ]
    },
    {
      id: "filling-corner",
      kind: "prose",
      heading: "Filling the corner",
      paragraphs: [
        `That summer I attended a summer school on economic networks in Oxford. I went to meet people and collect problems. Instead, I collected a dataset. Laura Alessandretti gave a talk about a project built on phone data. She and Anna Sapienza, together with collaborators at DTU in Denmark, had been working on something that fit perfectly: around 100,000 people in France who had consented to donate their app-usage traces - over five years, in 15-minute intervals, with income inferable from where each person lived.`,
        `Scale and granularity. The empty corner, filled. We started digging.`
      ]
    },
    {
      id: "the-gap",
      kind: "prose",
      heading: "The gap",
      paragraphs: [
        `We found the gap almost immediately - this time at the level of individual people. The median low-income individual records 2h30 of screen time per day: 26 minutes more than the median high-income individual.`,
        `Twenty-six minutes may sound small. Until you compound it. It's 156 hours per year. Roughly twenty eight-hour workdays - a month of full-time work, every year, that the poor spend on their phones and the rich don't. Priced at the French minimum wage, that's about EUR 1,900 per person, per year.`
      ]
    },
    placeholderScene(
      "twenty-six-minutes",
      "26 minutes, compounded",
      "Animated unit-morph counter: 26 min/day -> 3 h/week -> 156 h/year -> 20 workdays -> EUR 1,900.",
      "A counter that turns a small daily gap into annual time and money.",
      accent.red
    ),
    {
      id: "gap-night",
      kind: "prose",
      paragraphs: [
        `And the minutes are not spread evenly across the day. The absolute gap peaks in the evening, around 9-10pm, at about two extra minutes per hour. The relative gap peaks in the dead of night: between 3 and 5am, low-income individuals log 50% more screen time than high-income ones.`,
        `Remember my 2am Tuesday? Those hours, it turns out, are where the divide is widest.`
      ]
    },
    placeholderScene(
      "hour-of-day-gap",
      "Hour-of-day gap",
      "The hour-of-day gap curve draws left to right; the night region shades in as the line enters it. Reuse these axes later.",
      "A memorable line chart for when the gap happens.",
      accent.purple
    ),
    {
      id: "two-mountains",
      kind: "prose",
      heading: "Two mountains",
      paragraphs: [
        `But 26 minutes spent where? Is this a general scaling - low-income users simply doing everything more on their phones? Or is the gap specific to certain kinds of apps? Before we could split the gap, we had to map the terrain it lives on: the app ecosystem itself.`,
        `That turned out to be deceptively hard. App-store categories are inconsistent. Apps change. Manual labels smuggle in judgment - who am I to declare which apps are "engaging"? We went back and forth, classifying and reclassifying, getting different answers every time. Then we made the move that unlocked everything:`,
        `We stopped asking what apps say they are, and started asking how people behave when they use them.`,
        `Two simple quantities give each app a behavioral footprint: how often people open it, and how long they stay once they do. Plot every app on those two axes and something surprising pops out. The landscape doesn't form a smooth continuum. It splits into two mountains. On one: apps you open briefly, for a purpose - weather, banking, bookings, maps. On the other: apps you open often and stay long - social media, video, games. Two modes of engagement: one quick, one sticky.`,
        `We didn't impose the split. The behavior of 100,000 people drew it for us. We called the two groups non-engaging and engaging apps.`
      ]
    },
    placeholderScene(
      "app-landscape",
      "The app landscape",
      "Interactive Fig. 2A-style scatter. App icons drop onto the terrain; include a guessing beat before Facebook, Candy Crush, Netflix, Weather, Booking, and McDonald's reveal.",
      "Behavioral app landscape with two engagement mountains.",
      accent.blue
    ),
    {
      id: "one-tap",
      kind: "prose",
      heading: "One tap",
      paragraphs: [
        `But is "engaging" anything more than a label for apps people happen to like? The data lets us test it, with the closest thing we have to an experiment: 1.5 million app installs.`,
        `Compare two groups of people: those who install an engaging app, and those who install a tool app. Before the install, the two groups are indistinguishable. Then, on install day, the engaging group's screen time jumps by 20 minutes. And it doesn't come back down for weeks - an extra hour and a half of phone time over the following month, from a single tap on "Install." Everyone remembers the week they got TikTok. Here it is, drawn by 1.5 million installs.`
      ]
    },
    placeholderScene(
      "install-event-study",
      "Install event study",
      "Event-study chart populates left to right: axes, flat pre-install line, then the jump after day 0.",
      "A before/after install chart that makes one tap feel consequential.",
      accent.green
    ),
    {
      id: "one-tap-after",
      kind: "prose",
      paragraphs: [
        `So engaging apps don't just fill the time people were going to spend on their phones anyway. They expand it. The name isn't a judgment. It's a measurement.`
      ]
    },
    {
      id: "the-split",
      kind: "prose",
      heading: "The split",
      paragraphs: [
        `Which brings us back to the question. Two mountains - one quick, one sticky, and the sticky one expands your day. Twenty-six minutes of gap. Which mountain carries them?`,
        `We split the income gap by app group - and the result looks almost designed. The entire gap falls on one side of the mountain range.`,
        `Non-engaging apps: no income gap. Less than a minute a day. Rich and poor use the tools of the phone - the maps, the banking, the bookings - almost identically.`,
        `Engaging apps: the whole 26 minutes, essentially. Social media alone accounts for roughly half the gap, followed by games and video.`,
        `The income gap in screen time is not a gap in phone use. It is a gap in disconnection from the apps that, once installed, take more of your day.`
      ]
    },
    placeholderScene(
      "split",
      "The split",
      "Reuse the hour-of-day chart. Total gap sits in background; non-engaging curve draws flat at zero; engaging curve traces the original.",
      "Same axes as before, now revealing which app group carries the gap.",
      accent.red
    ),
    {
      id: "the-night",
      kind: "prose",
      heading: "The night",
      paragraphs: [
        `So the poor spend 26 more minutes a day inside engaging apps. You could still shrug. It's leisure. It's free. Who am I to judge how anyone spends their evening?`,
        `Except a day has only 24 hours. If engaging apps expand phone time, that time comes from somewhere. And remember where the gap lives: the late evening, the dead of night.`,
        `What lives there is sleep.`,
        `We can't see sleep in phone traces. But we can see its shadow: the longest stretch of each day without any phone activity - for most people, the night. The more time someone spends in engaging apps, the shorter that stretch gets. At the low end of engaging-app time, the longest break exceeds 12 hours. At the high end, it shrinks to about 7. And this isn't just different kinds of people living different lives: within the same person, a day with two extra engaging hours shrinks their own night by nearly an hour. Same person, same phone, same life - more engaging time, shorter night.`
      ]
    },
    placeholderScene(
      "shape-of-day",
      "The shape of a day",
      "Horizontal 24h strip with activity ticks; longest phone-free gap glows. As engaging-app hours rise, the dark band narrows from 12h to 7h.",
      "A day-shaped visual that makes the sleep-shadow argument intuitive.",
      accent.purple
    ),
    {
      id: "who-can-disconnect",
      kind: "prose",
      heading: "Who can disconnect",
      paragraphs: [
        `None of this proves that the 26 minutes come out of sleep. But they sit exactly where sleep would be. Rich and poor aren't just filling their phones differently. They may be getting different nights.`,
        `So why do lower-income individuals spend more time in engaging apps? Honestly: we don't know yet. We can measure the gap, pin it to the stickiest corner of the app ecosystem, and show that this corner expands days and shortens nights. The why is the next paper. But I can tell you the three suspects.`,
        `Maybe it's substitution: when leisure costs money, the free, infinite feed wins by default.`,
        `Maybe it's habit: engaging apps are built to fill every bored, tired, stressed moment - and moments, repeated, harden into habits.`,
        `Or maybe it's exactly what my own story suggests: boundaries are expensive. The blockers, the second devices, the e-ink phones, the quiet evenings, the energy to keep experimenting when attempt number five fails - the whole arsenal I spent two years and EUR 2,000 assembling.`,
        `My e-ink phone still works, by the way. For now. But I've stopped thinking of my 2am problem as a personal failure - and I've stopped thinking of my escape as a personal victory, too. I got out because I could afford to.`,
        `For thirty years, the digital divide meant unequal access: who has a device, a connection, the skills to benefit. That divide is closing. In its place, our data suggests a new one is opening - and it runs the other way.`,
        `The first divide was about who can connect.`,
        `The new one is about who can disconnect.`
      ]
    }
  ];
</script>

<svelte:head>
  <title>Has disconnection become a privilege?</title>
  <meta
    name="description"
    content="A scrollytelling draft about smartphone disconnection, engaging apps, income, and inequality."
  />
</svelte:head>

<svelte:window on:scroll={updateArticleProgress} on:resize={updateArticleProgress} />

<div class="article-progress" aria-hidden="true">
  <div class="article-progress-fill" style={`transform: scaleX(${articleProgress})`}></div>
</div>

<main class="page">
  <article class="article intro">
    <h1>Has disconnection become a privilege?</h1>
    <div class="prose">
      {#each introParagraphs as paragraph}
        <p>{paragraph}</p>
      {/each}
    </div>
  </article>

  {#each contentBlocks as block (block.id)}
    {#if block.kind === "prose"}
      <ProseSection heading={block.heading} paragraphs={block.paragraphs} />
    {:else}
      <StickyScene
        sceneId={block.scene.id}
        ariaLabel={block.scene.label}
        pinDurationVh={block.scene.pinDurationVh ?? 230}
        tailHoldVh={48}
        steps={block.scene.steps}
      >
        <div class="visual-stage">
          <PlaceholderCanvas label={block.scene.label} note={block.scene.note} />
        </div>

        <svelte:fragment slot="legend">
          <div class="placeholder-caption">Figure placeholder - replace with final visual asset later</div>
        </svelte:fragment>
      </StickyScene>
    {/if}
  {/each}
</main>

<style>
  .article-progress {
    position: fixed;
    inset: 0 0 auto;
    z-index: 80;
    height: 4px;
    pointer-events: none;
  }

  .article-progress-fill {
    width: 100%;
    height: 100%;
    transform-origin: left center;
    background: linear-gradient(90deg, #e2ad42, #ff5c45, #6372ff);
    will-change: transform;
  }

  .page {
    width: 100%;
    overflow-x: clip;
  }

  .article {
    max-width: 550px;
    margin: 0 auto;
    padding: 26px 18px 56px;
  }

  .intro {
    min-height: 94svh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-bottom: 10svh;
  }

  h1 {
    margin: 0 0 18px;
    font-size: clamp(36px, 8vw, 68px);
    line-height: 0.94;
    letter-spacing: 0;
  }

  .prose {
    font-size: clamp(19px, 4.6vw, 24px);
    line-height: 1.52;
  }

  .prose p {
    margin: 0 0 1.05em;
  }

  .visual-stage {
    width: 100%;
    height: 100%;
    min-height: 0;
    overflow: hidden;
    border-radius: 8px;
  }

  .placeholder-caption {
    color: #b8ada0;
    font-family: Arial, sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-align: center;
    text-transform: uppercase;
  }

  @media (max-width: 720px) {
    .article {
      padding: 20px 16px 54px;
    }

    .intro {
      min-height: 92svh;
    }
  }
</style>
