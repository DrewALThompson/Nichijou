DATA = {
    :user_keys =>
      ["username", "password"],
    :users => [
        ["Drew", "quack"],
        ["Jose", "Jose"],
        ["Mike", "Mike"],
        ["Rachel", "Rachel"],
        ["怒龍", "Drew"],
        ["トレバー", "Trevor"]
    ],

    :event_keys =>
      ["title", "datetime_of", "notes"],
    :events => [
        ["Birthday", "2021-01-11T03:36", "It's my Birthday"],
        ["Project Start", "2021-01-21T03:00", "Project Time"],
        ["Project End", "2021-02-05T00:00 ", "Project should be finished"],
        ["Mom's Bday", "2021-01-20T00:00", "It's Mom's Bday buy present"]
    ],
}

def main 
  make_users
  make_events
end

def make_users
  DATA[:users].each do |user|
    new_user = User.new
    user.each_with_index do |attribute, i|
      new_user.send(DATA[:user_keys][i]+"=", attribute)
    end
    new_user.save
  end
end

def make_events
  DATA[:events].each do |event|
    new_event = Event.new
    event.each_with_index do |attribute, i|
      new_event.send(DATA[:event_keys][i]+"=", attribute)
    end
    new_event.save
  end
end

main