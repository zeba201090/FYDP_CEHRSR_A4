import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {

  const res = await request.json();
  console.log(res);
  const streamName= "80272410";
  const multichainConfig = {
    host: process.env.HOST,
    port: process.env.RPCPORT,
    rpcuser: process.env.RPCUSER,
    rpcpassword: process.env.RPCPASSWORD,
  };

  const formData = {
    json: res
  };
  console.log('formData', formData);

  try {
    // Publish Data to Stream
    console.log('publishing data');
    const publishResponse = await axios.post(
      `http://${multichainConfig.host}:${multichainConfig.port}`,
      {
        method: 'publish',
        params: [streamName, 'EHR', formData],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + Buffer.from(`${multichainConfig.rpcuser}:${multichainConfig.rpcpassword}`).toString('base64'),
        },
      }
    );

    const publishData = await publishResponse.data;

    if (publishData.result) {
        console.log('Publish successful');
        console.log('Multichain response:', publishData.result);
        return NextResponse.json({ message: 'Success' });
      } else {
        console.error('Error publishing to Multichain:', publishData.error);
        return NextResponse.json({ message: 'Failed to publish to Multichain' });
      }
    } catch (error) {
      console.error('Error processing request:', error);
      return NextResponse.json({ message: 'Internal Server Error' });
    }
  }