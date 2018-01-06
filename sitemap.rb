require 'rubygems'
require 'sitemap_generator'

SitemapGenerator::Sitemap.default_host = 'http://qlgd.hpu.edu.vn'
SitemapGenerator::Sitemap.create do
  add '/', :changefreq => 'daily', :priority => 0.9
  add '/tenants', :changefreq => 'weekly'
  add '/lop', :changefreq => 'weekly'
  add '/sinh_viens', :changefreq => 'weekly'
  add '/giang_viens', :changefreq => 'weekly'
  add '/lich', :changefreq => 'weekly'
end
