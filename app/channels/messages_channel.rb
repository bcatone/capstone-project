class MessagesChannel < ApplicationCable::Channel
  def subscribed
    stop_all_streams
    @team = Team.find(params[:id])
    stream_for @team
  end
  
  def receive(data)
    user = User.find_by(id: data['userId'])
    message = @team.messages.create(content: data['content'], user: user)
    MessagesChannel.broadcast_to(@team, MessageSerializer.new(message).serialized_json)
    MessageRelayJob.perform_later(message)
  end

  def unsubscribed
    stop_all_streams
  end
end
