class ChatChannel < ApplicationCable::Channel
  def subscribed
    user = params['username']
    stream_for 'public_chat'
    ActionCable.server.broadcast 'public_chat', "#{user} joined!"
  end

  def speak(data)
    message = Message.create(body: data['message'])
    socket = { message: message.body }
    ChatChannel.broadcast_to('chat_channel', socket)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
