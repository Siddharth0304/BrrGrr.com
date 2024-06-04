const Byob = require("../models/byob");

module.exports.customize=(req,res)=>{
    res.render("byob/new.ejs");
};

module.exports.create=async(req, res)=>{
    const { bread, style, patty, vegetables, sauce } = req.body;
    try {
        let br = await Byob.find({ name: bread });
        let st = await Byob.find({ name: style });
        let pat = await Byob.find({ name: patty });
        let veg;
        if (!Array.isArray(vegetables)){
            veg=await Byob.find({name:vegetables});
        }
        else{
            veg = await Promise.all(vegetables.map(async (vege) => {
                let v = await Byob.find({ name: vege });
                return v[0];
            }));
        }
        let sau;
        if (!Array.isArray(sauce)){
            sau=await Byob.find({name:sauce});
        }
        else{
            sau = await Promise.all(sauce.map(async (sa) => {
                let v = await Byob.find({ name: sa });
                return v[0];
            }));
        }
        if(!req.session.cart)req.session.cart={}
        if(br && br.length>0)
            req.session.cart[br[0]._id]=1;
        if(st && st.length)
            req.session.cart[st[0]._id]=1;
        if(pat && pat.length>0)
            req.session.cart[pat[0]._id]=1;
        if(veg && veg.length>0){
            for(ve of veg){
                req.session.cart[ve._id]=1;
            }
        }
        if(sau && sau.length>0){
            for(sa of sau){
                req.session.cart[sa._id]=1;
            }
        }
        res.redirect("/cart");
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).send("Internal Server Error");
    }
}