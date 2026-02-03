const formatNumber = (value) => new Intl.NumberFormat("id-ID").format(value);

const renderSummary = async () => {
  const response = await fetch("/api/summary");
  const data = await response.json();

  const summary = document.getElementById("summary");
  summary.innerHTML = `
    <div class="stat">
      <strong>${formatNumber(data.totalLearners)}+</strong>
      <p>peserta aktif</p>
    </div>
    <div class="stat">
      <strong>${data.totalCourses}</strong>
      <p>kelas premium</p>
    </div>
    <div class="stat">
      <strong>${data.averageRating}</strong>
      <p>rating rata-rata</p>
    </div>
  `;
};

const renderCourses = async () => {
  const response = await fetch("/api/courses");
  const courses = await response.json();

  const container = document.getElementById("courses");
  container.innerHTML = courses
    .map(
      (course) => `
      <article class="card">
        <div class="card-header-row">
          <span class="badge">${course.tag}</span>
          <span>${course.level}</span>
        </div>
        <h3>${course.title}</h3>
        <p>Instruktur: ${course.instructor}</p>
        <p>Durasi: ${course.duration}</p>
        <div class="rating">
          ⭐ ${course.rating}
          <span>${formatNumber(course.learners)} peserta</span>
        </div>
        <div class="rating">
          <strong>Rp${formatNumber(course.price)}</strong>
        </div>
      </article>
    `
    )
    .join("");
};

const renderFeatures = async () => {
  const response = await fetch("/api/features");
  const features = await response.json();

  const container = document.getElementById("features");
  container.innerHTML = features
    .map(
      (feature) => `
      <article class="card feature-card">
        <h3>${feature.title}</h3>
        <p>${feature.description}</p>
      </article>
    `
    )
    .join("");
};

const renderTestimonials = async () => {
  const response = await fetch("/api/testimonials");
  const testimonials = await response.json();

  const container = document.getElementById("testimonials");
  container.innerHTML = testimonials
    .map(
      (testimonial) => `
      <article class="card testimonial-card">
        <p>“${testimonial.quote}”</p>
        <div>
          <strong>${testimonial.name}</strong>
          <p>${testimonial.role}</p>
        </div>
      </article>
    `
    )
    .join("");
};

const init = () => {
  renderSummary();
  renderCourses();
  renderFeatures();
  renderTestimonials();
};

init();
