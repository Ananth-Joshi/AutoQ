interface propType{
  title:string,
  description:string,
  imageUrl:string
}

//Card to display features of app.
function FeatureCards({title,description,imageUrl}:propType) {
  return (
    <div className="card bg-base-100 w-96 shadow-xl hover:bg-base-200">
    <figure className="px-10 pt-10">
      <img
        src={imageUrl}
        alt="Shoes"
        className="rounded-xl" />
    </figure>
    <div className="card-body items-center text-center">
      <h2 className="card-title">{title}</h2>
      <p>{description}</p>
    </div>
  </div>
  )
}

export default FeatureCards