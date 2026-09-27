/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei', '@react-three/postprocessing'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
