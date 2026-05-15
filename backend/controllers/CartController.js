import Cart from '../models/Cart.js';

export const getCart=async(req,res)=>{
    const cart=await Cart.findOne({userId:req.params.userId});
    res.json(cart);

};

export const addToCart=async(req,res)=>{
    const{userId,product}=req.body;

    let cart=await Cart.findOne({userId});

    if(!cart){
        cart=new Cart({userId,products:[products]});
    }else{
        cart.products.push(product);
    }
    await cart.save();
    res.json(cart);
};

export const removeFromCart=async(req,res)=>{
    const{userId,productId}=req.body;

    const cart=await Cart.findOne({userId});

    cart.products=cart.products.filter(
        (p)=>p.productId !=productId
    );
    await cart.save();
    res.json(cart);
}