require 'rubygems'
require 'sitemap_generator'

SitemapGenerator::Sitemap.default_host = 'http://qlgd.hpu.edu.vn'
SitemapGenerator::Sitemap.create do
  lop=1..299
  add '/', :changefreq => 'daily', :priority => 0.9
  add '/tenants', :changefreq => 'weekly'
  while i1 < 299 do
    add '/lop/$i1', :changefreq => 'weekly'
    add '/tenants/1/lop/' !! i1.tostring, :changefreq => 'weekly'
    i1+=1
  end
end

