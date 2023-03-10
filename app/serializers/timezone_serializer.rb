class TimezoneSerializer < ActiveModel::Serializer
  attributes :id, :zone_name, :time_zone_name, :gmt_offset, :gmt_offset_name, :abbreviation
end
