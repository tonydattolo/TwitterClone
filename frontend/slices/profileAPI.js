import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:8000/profile/',
    prepareHeaders: (headers, { getState }) => {
      // const isAuthenticated = getState().auth.isAuthenticated
      // const token = getState().auth.token
      // const user = getState().auth.user
      // const access = getState().auth.access
      // const refresh = getState().auth.refresh
      // if (access && refresh) {
      //   // headers.set("authentication", `Bearer ${token}`)
      //   headers.set("Authentication", `JWT ${access}`)
      //   headers.set("Accept", "application/json")
      //   headers.set("Content-Type", "application/json")
      // }
      headers.set("Accept", "application/json")
      headers.set("Content-Type", "application/json")
      return headers
    }
  }),
  endpoints: (builder) => ({
    getProfileByEmail: builder.query({
      query: (email) => `${email}`,
      
    }),
    updateProfile: builder.mutation({
      query(data) {
        const { email, 
          first_name,
          last_name,
          bio,
          display_name 
        } = data
        return {
          url: `edit/${email}`,
          method: 'PATCH',
          body: {
            first_name: `${first_name}`,
            last_name: `${last_name}`,
            bio: `${bio}`,
            locations: "placeholder",
            display_name: `${display_name}`,
          }
        }
      }
    }),
    getAllProfiles: builder.query({
      query: () => `all/all`,
    }),

  }),
  refetchOnMountOrArgChange: true,

})

// format to generate hook for specific api endpoint query:
// for POST/PUT/PATCH/DELETE requests:
//    use<nameOfQuery>Mutation
// for GET requests:
//    use<nameOfQuery>Query
export const { 
  useGetProfileByEmailQuery,
  useUpdateProfileMutation,
  useGetAllProfilesQuery,

} = profileApi