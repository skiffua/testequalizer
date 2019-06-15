

function getinfoaboutfile(e){
    var detailsblock=document.getElementById("detailstrack")
    console.log(this)
    return {
        name: e.target.files[0].name,
        type: e.target.files[0].type,
        size: e.target.files[0].size
    }
}



export default getinfoaboutfile;