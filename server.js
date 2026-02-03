import http from "http";
import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, "public");

const courses = [
  {
    id: "course-react",
    title: "React untuk Pemula",
    instructor: "Dewi Kartika",
    level: "Pemula",
    rating: 4.8,
    learners: 12400,
    price: 149000,
    duration: "8 jam",
    tag: "Best Seller"
  },
  {
    id: "course-uiux",
    title: "UI/UX Design Produk Digital",
    instructor: "Rizky Pratama",
    level: "Menengah",
    rating: 4.7,
    learners: 8300,
    price: 179000,
    duration: "10 jam",
    tag: "Trending"
  },
  {
    id: "course-data",
    title: "Data Analytics dengan Python",
    instructor: "Nabila Yusuf",
    level: "Menengah",
    rating: 4.9,
    learners: 15600,
    price: 199000,
    duration: "12 jam",
    tag: "Top Rated"
  },
  {
    id: "course-mobile",
    title: "Flutter Mobile Bootcamp",
    instructor: "Arman Hidayat",
    level: "Pemula",
    rating: 4.6,
    learners: 9400,
    price: 169000,
    duration: "9 jam",
    tag: "Hands-on"
  }
];

const features = [
  {
    title: "Belajar fleksibel",
    description: "Akses materi kapan saja dengan video, kuis, dan proyek mandiri."
  },
  {
    title: "Mentor berpengalaman",
    description: "Instruktur industri yang siap membimbing dengan studi kasus nyata."
  },
  {
    title: "Sertifikat siap pakai",
    description: "Bangun portofolio dan sertifikasi setelah menyelesaikan kelas."
  }
];

const testimonials = [
  {
    name: "Salsa",
    role: "Product Designer",
    quote: "Materinya padat dan jelas. Dalam 3 minggu saya sudah punya portofolio baru."
  },
  {
    name: "Dimas",
    role: "Frontend Engineer",
    quote: "Latihan proyeknya relevan dengan kebutuhan kantor. Sangat membantu!"
  },
  {
    name: "Ratih",
    role: "Data Analyst",
    quote: "Belajar data analytics jadi lebih terstruktur dan gampang dipahami."
  }
];

const apiRoutes = {
  "/api/summary": () => ({
    totalCourses: courses.length,
    totalLearners: courses.reduce((sum, course) => sum + course.learners, 0),
    averageRating: (
      courses.reduce((sum, course) => sum + course.rating, 0) / courses.length
    ).toFixed(1)
  }),
  "/api/courses": () => courses,
  "/api/features": () => features,
  "/api/testimonials": () => testimonials
};

const mimeTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

const readStaticFile = async (urlPath) => {
  const cleanPath = urlPath === "/" ? "/index.html" : urlPath;
  const filePath = path.join(publicDir, cleanPath);
  const data = await readFile(filePath);
  const ext = path.extname(filePath);
  return { data, contentType: mimeTypes[ext] || "application/octet-stream" };
};

const server = http.createServer(async (req, res) => {
  try {
    if (apiRoutes[req.url]) {
      const payload = apiRoutes[req.url]();
      const json = JSON.stringify(payload);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(json);
      return;
    }

    const { data, contentType } = await readStaticFile(req.url);
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  } catch (error) {
    if (req.url !== "/" && req.url !== "/index.html") {
      res.writeHead(302, { Location: "/" });
      res.end();
      return;
    }

    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
  }
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
