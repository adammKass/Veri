const Section = ({ name, image, imageMobile, subheading }) => {
  return (
    <section className="relative snap-start h-dvh bg-amber-600">
      <div className="absolute inset-0">
        <picture>
          <source srcSet={imageMobile} media="(max-width: 768px)" />
          <source srcSet={image} media="(min-width: 769px)" />
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </picture>
      </div>
    </section>
  );
};
export default Section;
