const CartItem = require('../models/cartItem');
const stripeAPI = require('../utils/stripe');

async function createCheckoutSession(req, res){
    const domainUrl = process.env.WEB_APP_URL;	
    const { line_items, customer_email } = req.body; 
    //console.log(line_items, customer_email)
    
    if(!line_items || !customer_email){
        return res.status(400).json({ error: 'missing required session parameters'})   
    }
    
    let session;
        session = await stripeAPI.checkout.sessions.create({
            payment_method_types: ['card'],  //'afterpay_clearpay'
            mode: 'payment',
            line_items,
            customer_email,
            success_url: `${domainUrl}/success`, //?session_id={CHECKOUT_SESSION_ID}
            cancel_url: `${domainUrl}/cancel`,
            billing_address_collection: 'required',
            //shipping_address_collection: { allowed_countries: ['AU'] }
        });
        res.status(200).json({ sessionId: session.id, })
    
}

module.exports = {
    createCheckoutSession,
}