import "./aboutUs.css";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

const AboutUs = () => {
  return (
    <div>
      <Navbar />

      <div className="about-container">
        <div className="about-section">
          <h2>🪬The Enlightened Origins</h2>
          <p>
            Our gallery&apos;s story unfolds from a tapestry woven with threads
            of disorder and the ordinary, against which the vision for our space
            stood out starkly—a beacon of calm. It is said that an ethereal
            Buddha, in the stillness of a dream, whispered, &quot;Create a
            sanctuary, and tranquility will follow.&quot; Heeding this celestial
            advice, our journey began. The Buddha World Gallery was born from a
            collective of impassioned art aficionados, united by a reverence for
            the serene aesthetics of Buddhist tradition. From our humble
            beginnings, we have evolved into a distinguished haven, showcasing
            an eclectic collection of Buddhist art from every corner of the
            globe.
          </p>
          <p>
            🧡Special thanks to our museum curator friend Huiwen Liu, who
            generously provided us with her Buddha Artifacts dataset🧡
          </p>
        </div>

        <div className="about-section">
          <h2> 🕉️When Om-Mani-Padme-Hum meets Dot-Com</h2>
          <p>
            Our mission is to offer an enlightening experience that transcends
            the traditional museum visit. We seek to connect the past with the
            present, offering a space where ancient wisdom and modern curiosity
            meet. We aim to educate our audience on the profound narratives
            woven into Buddhist art, inspire a deeper appreciation for its
            aesthetic and philosophical depth, and provoke reflection on its
            contemporary relevance. Our carefully selected collection invites
            visitors to traverse the breadth of Buddhist culture—from its
            intricate iconography to its diverse expressions across different
            lands. These artifacts, each with a story to tell, were once removed
            from their origins and dispersed across continents in an era marked
            by colonial endeavors. Now, they serve not only as relics of their
            own rich historical contexts but also as symbols of resilience and
            cultural dialogue. Despite their journeys through times of conquest
            and appropriation, they echo the timeless Buddhist teachings of
            serenity and the liberating power of release.
          </p>
        </div>

        <div className="about-section">
          <h2> 🧘🏻🧘🏻‍♀️The Guardians of the Gallery</h2>
          <p>
            Our gallery is more than walls and webpages—it&apos;s a gathering of
            souls keen on history, seekers of zen, and yes, we&apos;ve got the
            incense enthusiast who&apos;s all about that aromatic life. Our
            founders, who once playfully confused an &quot;aha&quot; moment with
            a well-placed floor lamp, have brought together a crew that&apos;s
            as much at home in a dusty archive as in a lotus position.
            We&apos;re your modern-day monastery scribes and scripture-keepers,
            minus the robes. In our ranks, you&qpos;ll find a meditation
            virtuoso whose &quot;oms&quot; could drown out a rock concert, and a
            coding guru who&apos;s pretty sure a well-written algorithm is the
            universe talking back. Together, we&apos;re on a quest to serve up
            enlightenment with a digital twist, sharing the profound chill of
            the Buddha beat by beat—commercial-free, as the ancients intended.
          </p>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default AboutUs;
