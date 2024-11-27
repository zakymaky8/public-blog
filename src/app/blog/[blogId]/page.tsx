const BlogDetail = ({params}: {
    params: {
        blogId: string
    }
}) => {
  console.log(params);
  // fetch specific posts with comments from the api
  return (
    <div className="text-black flex flex-col w-full items-center gap-5 p-5">
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-bold" style={{maxWidth: "450px"}}>lastUpdate DateTime updated Atlast Update DateTime updatedAt</h1>
        <div className="flex gap-4 justify-start text-xs italic flex-wrap">
          <cite>Author: somebody</cite>
          <p>Created On: this day</p>
          <p>Updated on: This day</p>
        </div>
      </div>

      <div className="p-4">
        <p className="text-sm text-justify" style={{maxWidth: "600px"}}>Do you know what you need? You need a blog. Or maybe you don’t, or maybe you already have one,
           in any case, this project will be a great way to practice and see the benefits of creating an 
           API only backend. We’re actually going to create the backend and two different front-ends for 
           accessing and editing your blog posts. One of the front-end sites will be for people that want
            to read and comment on your posts, while the other one will be just for you to write, edit and
             publish your posts. Why are we setting it up like this? Because we can! The important exercise here is setting
           up the API and then accessing it from the outside. There are some security benefits to 
           setting up separate websites for blog consumption and blog editing, but really we’re just doing it like this to 
           demonstrate the power and flexibility of separating your backend code from your frontend code.now what you need? You need a blog. Or maybe you don’t, or maybe you already have one,
           in any case, this project will be a great way to practice and see the benefits of creating an 
           API only backend. We’re actually going to create the backend and two different front-ends for 
           accessing and editing your blog posts. One of the front-end sites will be for people that want
            to read and comment on your posts, while the other one will be just for you to write, edit and
             publish your posts. Why are we setting it up like this? Because we can! The important exercise here is setting
           up the API and then accessing it from the outside. There are some security benefits to 
           setting up separate websites for blog consumption and blog editing, but really we’re just doing it like this to 
        </p>
      </div>

      <div>
        <h2 className="font-bold text-xl mb-5">Comments: 40</h2>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col  p-3 rounded-xl " style={{maxWidth: "550px"}}>
            <h1 className="text-sm text-gray-600 underline">@zakymak</h1>
            <p className="pt-1 text-xs italic">Using checks like typeof wind in your rendering logic
Using browser-only APIs like window or localStorage in your rendering logic
Using time-dependent APIs such as the Date() constructor in your rendering logic </p>

            <div className="self-end">
              <span className="text-xs mr-1">33</span><button className="text-red-400 bg-slate-600 h-5 w-8 text-xs p-0">like</button><button className="text-red-400 bg-slate-600 h-5 w-8 text-xs p-0 ml-1">Reply</button>
            </div>
          </div>

          <div className="flex flex-col  p-3 rounded-xl " style={{maxWidth: "550px"}}>
            <span className="text-sm text-gray-600 underline">user user</span>
            <p className="pt-1 text-xs italic">Publish your posts. Why are we setting it up like this? Because we can! The important Publish your posts. Why are we setting it up like this? Because we can! The important Publish your posts </p>

            <div className="self-end">
             <span className="text-xs mr-1">33</span> <button className="text-red-400 bg-slate-600 h-5 w-8 text-xs p-0">like</button><button className="text-red-400 bg-slate-600 h-5 w-8 text-xs p-0 ml-1">Reply</button>
            </div>
          </div>

          <div className="flex flex-col  p-3 rounded-xl " style={{maxWidth: "550px"}}>
            <span className="text-sm text-gray-600 underline">user user</span>
            <p className="pt-1 text-xs italic">Publish your posts. Why are we setting it up like this? Because we can! The important Publish your posts. Why are we setting it up like this? Because we can! The important Publish your posts </p>

            <div className="self-end">
             <span className="text-xs mr-1">33</span> <button className="text-red-400 bg-slate-600 h-5 w-8 text-xs p-0">like</button><button className="text-red-400 bg-slate-600 h-5 w-8 text-xs p-0 ml-1">Reply</button>
            </div>
          </div>

          <div className="flex flex-col  p-3 rounded-xl " style={{maxWidth: "550px"}}>
            <span className="text-sm text-gray-600 underline">user user</span>
            <p className="pt-1 text-xs italic">Publish your posts. Why are we setting it up like this? Because we can! The important Publish your posts. Why are we setting it up like this? Because we can! The important Publish your posts </p>

            <div className="self-end">
             <span className="text-xs mr-1">33</span> <button className="text-red-400 bg-slate-600 h-5 w-8 text-xs p-0">like</button><button className="text-red-400 bg-slate-600 h-5 w-8 text-xs p-0 ml-1">Reply</button>
            </div>
          </div>

          <div className="flex flex-col  p-3 rounded-xl " style={{maxWidth: "550px"}}>
            <span className="text-sm text-gray-600 underline">user user</span>
            <p className="pt-1 text-xs italic">Publish your posts. Why are we setting it up like this? Because we can! The important Publish your posts. Why are we setting it up like this? Because we can! The important Publish your posts </p>

            <div className="self-end">
             <span className="text-xs mr-1">33</span> <button className="text-red-400 bg-slate-600 h-5 w-8 text-xs p-0">like</button><button className="text-red-400 bg-slate-600 h-5 w-8 text-xs p-0 ml-1">Reply</button>
            </div>
          </div>
        </div>
      </div>

    </div>
    
  )
}

export default BlogDetail