
import { selectTeamById } from '../teams/teamsSlice'
import { isAfter, parseISO, subYears } from 'date-fns'

const messagesAdapter = createEntityAdapter()

const initialState = messagesAdapter.getInitialState({
  
})

export const selectUnreadMessages = createSelector(
    [selectMessagesByTeam, selectTeamById],
    (messages, team) => {
      const lastReadAt = parseISO(team.lastReadAt) || subYears(Date.now(), 1)
      return messages.filter((message) =>
        isAfter(parseISO(message.created_at), lastReadAt)
      )
    }
  )

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
      messageReceived(state, action) {
        const data = action.payload.data
        const message = {
          id: data.id,
          ...data.attributes,
          teamId: data.relationships.team.data.id,
          userId: data.relationships.user.data.id,
        }
        messagesAdapter.addOne(state, message)
      },
    },
    extraReducers: {
      
     //...
      
    },
  })
  
  export const { messageReceived } = messagesSlice.actions;

  export const { selectAll: selectAllMessages } = messagesAdapter.getSelectors(
    (state) => state.messages
  );
  
  export const selectMessagesByTeam = createSelector(
    [selectAllMessages, (state, teamId) => teamId],
    (messages, teamId) => messages.filter((message) => message.teamId === teamId)
  );
  
  export default messagesSlice.reducer
  