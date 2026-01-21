// app/products/[id]/page.tsx
import { products } from "@/app/data";
import OrderForm from "@/app/components/OrderForm"; // Vérifiez le chemin d'import
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";

const getYouTubeEmbedUrl = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) 
    ? `https://www.youtube.com/embed/${match[2]}` 
    : null;
};

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = products.find((p) => p.id === resolvedParams.id);

  if (!product) return notFound();
  const videoUrl = product.youtubeUrl ? getYouTubeEmbedUrl(product.youtubeUrl) : null;

  return (
    <div dir="rtl" className="min-h-screen bg-white py-6 md:py-10 px-4 font-sans text-right">
      <div className="max-w-6xl mx-auto">
      

        {/* GRID RESPONSIVE : 
           - Mobile/Tablette : 1 colonne (grid-cols-1)
           - Desktop (lg) : 2 colonnes (lg:grid-cols-2)
        */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          
          {/* --- COLONNE GAUCHE (Image Principale) --- */}
          {/* 'lg:sticky lg:top-8' permet à l'image de suivre le scroll sur grand écran */}
          <div className="w-full lg:sticky lg:top-8">
            <div className="relative w-full aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-md">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover" // Corrige l'affichage de l'image
                priority
              />
            </div>
          </div>

          {/* --- COLONNE DROITE (Contenu) --- */}
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <p className="text-xl md:text-2xl font-semibold text-blue-600 mb-6">
              {product.price.toFixed(2)} LYD
            </p>

            {/* Description 1 */}
            <div className="prose text-gray-700 leading-relaxed mb-6 text-base md:text-lg whitespace-pre-line font-medium max-w-none">
              {product.description}
            </div>

            <OrderForm productId={product.id} price={product.price} />

            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mt-6">
              {product.title1}
            </h3>

            {/* Description 2 (si existe) */}
            {product.description1 && (
                <div className="prose text-gray-700 leading-relaxed my-6 text-base md:text-lg whitespace-pre-line font-medium max-w-none">
                  {product.description1}
                </div>
            )}

            {/* Image Secondaire 1 */}
        {product.image1 && (
  // J'ai remplacé 'aspect-video' par 'aspect-square' pour que l'image soit bien visible sur mobile
        <div className="relative w-full aspect-square md:aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-sm mb-8 border border-gray-200">
          <Image
            src={product.image1}
            alt={product.name}
            fill
            className="object-fit"
          />
        </div>
          )}

            {/* Rappel Formulaire */}
            <OrderForm productId={product.id} price={product.price} />

            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mt-6">
              {product.title2}
            </h3>

            {/* Description 3 (si existe) */}
            {product.description2 && (
                <div className="prose text-gray-700 leading-relaxed my-6 text-base md:text-lg whitespace-pre-line font-medium max-w-none">
                  {product.description2}
                </div>
            )}

            {/* Image Secondaire 2 */}
             {product.image2 && (
  // J'ai remplacé 'aspect-video' par 'aspect-square' pour que l'image soit bien visible sur mobile
        <div className="relative w-full aspect-square md:aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-sm mb-8 border border-gray-200">
          <Image
            src={product.image2}
            alt={product.name}
            fill
            className="object-fit"
          />
        </div>
          )}

            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 mt-6">
              {product.title3}
            </h3>

            {/* Description 4 (si existe) */}
            {product.description3 && (
                <div className="prose text-gray-700 leading-relaxed mb-8 text-base md:text-lg whitespace-pre-line font-medium max-w-none">
                  {product.description3}
                </div>
            )}

            <div className="border-t border-gray-100 my-4"></div>

            {videoUrl && (
              <div className="mt-8 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">فيديو توضيحي للمنتج:</h3>
                <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                  <iframe
                    src={videoUrl}
                    title={product.name}
                    className="absolute top-0 left-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

           
            <OrderForm productId={product.id} price={product.price} />
          </div>
        </div>
      </div>
    </div>
  );
}