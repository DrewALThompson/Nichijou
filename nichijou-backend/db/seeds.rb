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
      ["title", "datetime_of", "notes", "user_id"],
    :events => [
        ["Birthday", "2021-01-11T03:36", "It's my Birthday", 1],
        ["Mom's Bday", "2021-01-20T00:00", "It's Mom's Bday buy present", 1],
        ["Project Start", "2021-01-21T03:00", "Project Time", 1],
        ["Project End", "2021-02-05T00:00 ", "Project should be finished", 1],
        ["Test", "2021-01-11T03:34", "test", 2],
        ["Test2", "2021-01-11T03:35", "test2", 2],
        ["Test3", "2021-01-11T03:37", "test3", 2],
        ["Test4", "2021-01-11T03:38", "test4", 2],
        ["Test5", "2021-01-11T03:39", "test5", 2],
        ["Test6", "2021-01-11T03:40", "test6", 2]
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