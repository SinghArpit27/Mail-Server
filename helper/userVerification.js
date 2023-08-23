import twilio from 'twilio';


const accountSid = 'AC71717d03925ff2c5c506bc56f442cfb5';
const authToken = '50384f3887af4dd506618cd2cb838172';

const client = twilio(accountSid, authToken);

const phoneOTP = (name, phone, otp) => {
    client.messages.create({
        from: '+17622513080',
        to: `+91${phone}`,
        body: 'Hi ' + name + ', Please verify Your account with OTP: ' + otp
    })
    .then(message => console.log(`OTP has been sent:- ${phone}`))
    .catch((err) => {console.log(err)});
}

export default phoneOTP;