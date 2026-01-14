import { Navigation } from './Navigation';
import { AuroraFooter } from './AuroraFooter';
import { GlassFeatures } from './GlassFeatures';

export function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#FCFCFD] overflow-x-hidden pt-20">
      <Navigation />
      <GlassFeatures />
      <AuroraFooter />
    </div>
  );
}
