# Galaxy Hub Astro Migration PRD

## Executive Summary

The Galaxy Community Hub is being migrated from Gridsome (Vue 2) to Astro (Vue 3) to modernize the technology stack, improve performance, and ensure long-term maintainability.

## Project Status

**Current Phase**: Phase 3 Complete, Starting Phase 4
**Completion**: ~40% (3 of 8 phases complete)

## Objectives

1. **Modernize Stack**: Migrate from deprecated Gridsome to actively maintained Astro
2. **Maintain Feature Parity**: Ensure all existing functionality is preserved
3. **Improve Performance**: Leverage Astro's partial hydration and modern build system
4. **Enhance Developer Experience**: Use Vue 3 Composition API and modern tooling

## Technical Architecture

### Content System
- **Collections**: 7 content types (articles, vue-articles, events, platforms, bare-articles, inserts, datasets)
- **Total Files**: 4,346 markdown/YAML files
- **Preprocessing**: Custom script converts Gridsome format to Astro collections

### Component Stack
- **Framework**: Astro 4.16 with Vue 3.5 integration
- **UI Library**: Bootstrap 5 (migrated from Bootstrap Vue)
- **Search**: Client-side Lunr.js
- **Visualizations**: Vega-Lite via VegaEmbed
- **Social Embeds**: Twitter, Mastodon widgets

### Testing Strategy
- **E2E Tests**: Playwright for all components and pages
- **Test Coverage**: 100% of migrated components have tests
- **CI Integration**: Tests run on every commit

## Completed Work

### Phase 1: Foundation ✅
- Astro project setup
- Content collection schemas
- Base layouts
- Bootstrap 5 integration

### Phase 2: Content Processing ✅
- Preprocessing pipeline
- Image migration
- Content validation
- Collection organization

### Phase 3: Component Migration ✅
All 12 core components migrated:
- Navigation (NavBar)
- Content display (LinkBox, VegaEmbed, MarkdownEmbed)
- Media (VideoPlayer, Carousel)
- Social (Twitter, Mastodon)
- UI (Footer, Search, Tabs, Accordion)
- Special (CalendarEmbed)

## Remaining Work

### Phase 4: Regional Subsites (In Progress)
- Implement /eu, /au, /us routing
- Regional content filtering
- Custom navigation per region

### Phase 5: Additional Features
- RSS feed generation
- Redirect handling system
- 404 error page

### Phase 6: Quality Assurance
- Analytics integration (Google Analytics/Plausible)
- Visual regression testing
- Accessibility audit

### Phase 7: Performance
- Build optimization
- Image optimization pipeline
- Bundle size reduction

### Phase 8: Deployment
- Production configuration
- CI/CD pipeline
- Migration runbook

## Risk Mitigation

1. **Content Loss**: All content validated during preprocessing
2. **Feature Gaps**: Comprehensive test suite ensures parity
3. **Performance**: Astro's architecture improves performance
4. **SEO Impact**: URL structure maintained, redirects planned

## Success Metrics

1. **Technical**
   - All 4,346 content files rendered correctly
   - All components maintain feature parity
   - Page load time < 2 seconds
   - Lighthouse score > 90

2. **Functional**
   - Search functionality works across all content
   - Regional subsites function correctly
   - Social embeds load properly
   - Navigation works on all devices

3. **Operational**
   - Build time < 10 minutes
   - Deploy process automated
   - Content updates seamless
   - Developer onboarding simplified

## Timeline

- **Phase 1-3**: ✅ Complete
- **Phase 4**: 1 week (Regional subsites)
- **Phase 5**: 1 week (Additional features)
- **Phase 6**: 1 week (Quality assurance)
- **Phase 7**: 3 days (Performance)
- **Phase 8**: 3 days (Deployment)

**Total Remaining**: ~3.5 weeks

## Dependencies

- Astro framework updates
- Vue 3 ecosystem
- Bootstrap 5 compatibility
- Third-party embed APIs (Twitter, Google Calendar)

## Next Steps

1. Begin Phase 4: Regional subsite implementation
2. Review and test all migrated components
3. Plan content freeze for final migration
4. Prepare deployment infrastructure