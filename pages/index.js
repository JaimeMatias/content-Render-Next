import { createClient } from "contentful"
import RecipeCard from '../components/RecipeCards'

export async function getStaticProps(){
const client= createClient({
  space:process.env.CONTENTFUL_SPACE_ID,
  accessToken:process.env.CONTENTFUL_ACCESS_TOKEN,
})
const res = await client.getEntries({content_type:'recipe'})
return{
  props:{
    recipes:res.items
  },
  revalidate:10
}
}
export default function Home({recipes}) {
  
  return (
    <div className="recipe-list">
      {recipes.map(recipe=>(
        //<div key={recipe.sys.id}>{recipe.fields.title}</div>
        <RecipeCard  key={recipe.sys.id} recipe={recipe}/>
      ))}
      <style jsx>{`
      .recipe-list { 
        display: grid;
        grid-template-colums: 1fr 1fr;
        grid-gap: 20px 60px;
      }
      `}</style>
    </div>
  )
}