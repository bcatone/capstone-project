require 'rest-client'
require 'uri'
require 'net/http'
require 'openssl'
require './app/OnetWebService'
require 'json'
require process.env.REACT_APP_SECRET_USERNAME
require process.env.REACT_APP_SECRET_PASSWORD

onet_ws = OnetWebService.new(REACT_APP_SECRET_USERNAME, REACT_APP_SECRET_PASSWORD)

puts "Seeding direct message lists..."
friendships = Friendship.all
friendship.each do |f|
    if !DirectMessageList.find_by(friendship: f)
        DirectMessageList.create!(friendship: f)
    end
end

# puts "Seeding Interest Profiler Questions from O*NET..."
# response = onet_ws.call("mnm/interestprofiler/questions?start=1&end=60")
# hash = JSON.parse(response.to_json)
# questions = hash["question"]
# questions.each do |question|
#     area = question["area"]
#     text = question["text"]
#     InterestProfilerQuestion.create!(area: area, text: text)
# end
# puts "Done seeding Interest Profiler Questions from O*NET"

# puts "Seeding Industries from O*NET..."
# response = onet_ws.call(REACT_APP_SECRET_USERNAME, REACT_APP_SECRET_PASSWORD)
# puts "Done seeding Industries from O*NET"

# puts "Seeding industries from O*NET..."
# response = onet_ws.call("https://services.onetcenter.org/ws/mnm/browse/")
# hash = JSON.parse(response.to_json)
# industries = hash["industry"]
# industries.each do |industry|
#     title = industry["title"]
#     code = industry["code"]
# end
# puts "Done seeding industries from O*NET"

puts "Seeding job titles from O*NET..."
response = onet_ws.call("https://services.onetcenter.org/ws/mnm/careers/name?start=1&end=923")
hash = JSON.parse(response.to_json)
puts hash
# careers = hash["career"]
hash.each do |career|
    puts career["title"]
    puts career["code"]
    title = career["title"]
    code = career["code"]
    Career.create!(title: title, code: code)
end
puts "Done seeding job titles from O*NET"


# puts hash

# url = URI("https://linkedin-job1.p.rapidapi.com/%7BPATH%7D")

# http = Net::HTTP.new(url.host, url.port)
# http.use_ssl = true
# http.verify_mode = OpenSSL::SSL::VERIFY_NONE

# request = Net::HTTP::Get.new(url)

# response = http.request(request)
# puts response.read_body

# puts "Seeding countries..."
# country_records = JSON.parse(File.read(Rails.root + "db/json/countries.json"))
# country_records.each do |country|
#     csc_source_id = country["id"]
#     name = country["name"]
#     isoCode = country["iso2"]
#     region_name = country["region"]
#     region = Region.find_by(name: region_name)
#     if !region
#         puts "Creating new region #{region_name}..."
#         new_region = Region.create!(name: country["region"])
#         puts "Finished creating new region #{region_name}"
#         region = new_region
#     end
#     subregion_name = country["subregion"]
#     subregion = Subregion.find_by(name: subregion_name)
#     if !subregion
#         puts "Creating new subregion #{subregion_name}..."
#         new_subregion = Subregion.create!(name: subregion_name, region: region)
#         puts "Finished creating new subregion #{subregion_name}"
#         subregion = new_subregion
#     end
#     currency_name = country["currency_name"]
#     currency = Currency.find_by(name: currency_name)
#     if !currency
#         puts "Creating new currency #{currency_name}..."
#         currency_abbreviation = country["currency"]
#         currency_symbol = country["currency_symbol"]
#         new_currency = Currency.create!(name: currency_name, abbreviation: currency_abbreviation, symbol: currency_symbol)
#         puts "Finished creating new currency #{currency_name}"
#         currency = new_currency
#     end
#     latitude = country["latitude"]
#     longitude = country["longitude"]

#     puts "Creating new country #{name}"
#     Country.create!(csc_source_id: csc_source_id, name: name, isoCode: isoCode, region: region, subregion: subregion, currency: currency, latitude: latitude, longitude: longitude)
#     puts "Finished creating country #{name}"
     
# end
# puts "Finished seeding countries"

# puts "Seeding states..."
# state_records = JSON.parse(File.read(Rails.root + "db/json/states.json"))
# state_records.each do |state|
#     if (!State.find_by(name: state["id"]))
#     csc_source_id = state["id"]
#     name = state["name"]
#     isoCode = state["state_code"]
#     country_csc_source_id = state["country_id"]
#     country = Country.find_by!(csc_source_id: country_csc_source_id)
#     # type = state["type"]
#     latitude = state["latitude"]
#     longitude = state["longitude"]
#     puts "Creating state #{name}"
#     State.create!(csc_source_id: csc_source_id, name: name, isoCode: isoCode, country: country, latitude: latitude, longitude: longitude)
#     puts "Finished creating state #{name}"
#     end
# end
# puts "Finished seeding states"

# puts "Seeding cities..."
# city_records = JSON.parse(File.read(Rails.root + "db/json/cities.json"))
# city_records.each do |city|
#     csc_source_id = city["id"]
#     name = city["name"]
#     state = State.find_by(csc_source_id: city["state_id"])
#     country = Country.find_by(csc_source_id: city["country_id"])
#     latitude = city["latitude"]
#     longitude = city["longitude"]
#     puts "Creating city #{name}"
#     City.create!(csc_source_id: csc_source_id, name: name, state: state, country: country, latitude: latitude, longitude: longitude)
#     puts "Finished creating city #{name}"
# end
# puts "Finished seeding cities"







# puts "Destroying seeds..."
# AdministrativeDivision.destroy_all
# Country.destroy_all
# puts "Finished destroying seeds"

# puts "Seeding countries..."

# # Make sure United States is the first seeded country
# Country.create!(name: "United States", fips: "US")

# # Seed the rest of the countries
# countries_response = RestClient.get "https://countrycode.dev/api/countries"
# countries_hash = JSON.parse(countries_response)
# countries_hash.each do |country|
#     country_response = RestClient.get URI.encode("https://countrycode.dev/api/countries/#{country}")
#     country_hash = JSON.parse(country_response)
#     fips = country_hash[0]["FIPS"]
#     if !Country.find_by(name: country)
#         new_country = Country.create!(name: country, fips: fips)
#     end
# end

# puts "Finished seeding countries"

# puts "Seeding administrative divisions..."
# countries = Country.all
# countries.each do |country|
#     begin
#         state_response = RestClient.get "https://rawcdn.githack.com/kamikazechaser/administrative-divisions-db/master/api/#{country.fips}.json"
#         rescue RestClient::NotFound
#             puts "No administrative divisions found for #{country.name}."
#         else
#             state_hash = JSON.parse(state_response)
#             state_hash.each do |state|
#                 AdministrativeDivision.create!(name: state, country: country)
#             end
#         end
# end

# puts "Finished seeding administrative divisions"

puts "Finished seeding data!"