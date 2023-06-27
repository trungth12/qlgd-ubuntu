Clerk.configure do |c|
  c.api_key = "sk_live_wAKjoSlFcsxTQky3E0RBqSUA5MJ3PeTTMXNm0ibQ4X" # if omitted: ENV["CLERK_API_KEY"] - API calls will fail if unset
  c.base_url = "https://api.clerk.dev/v1/" # if omitted: "https://api.clerk.dev/v1/"
  c.logger = Logger.new(STDOUT) # if omitted, no logging
  c.middleware_cache_store = ActiveSupport::Cache::FileStore.new("/tmp/clerk_middleware_cache") # if omitted: no caching
#  c.excluded_routes ["/foo", "/bar/*"]
end
