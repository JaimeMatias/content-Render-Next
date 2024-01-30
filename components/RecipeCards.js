import Image from "next/image";
import Link from "next/link";

export default function RecipeCard({ recipe }) {
  const { title, slug, coockingTime, thumbnail } = recipe.fields;
  return (
    <div className="card">
      <div className="featured">
        <Image
          src={"https:" + thumbnail.fields.file.url}
          width={thumbnail.fields.file.details.image.width}
          height={thumbnail.fields.file.details.image.height}/>{" "}
      </div>
      <div className="content">
        <div className="Info">
          <h4>{title}</h4>
          <p>takes approx{coockingTime} min to make</p>
        </div>
        <div className="actions">
          <Link href={`/recipes/${slug}`}>Coock This</Link>
        </div>
      </div>
      <style jsx>{`
      .recipe-list { 
        display: grid;
        grid-template-colums: 1fr 1fr;
        grid-gap: 20px 60px;
      }
      `}</style>
    </div>
  );
}
