import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const OurStory = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Our Story</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-3 text-muted-foreground">
          Founded in 2000 by Moyudu Gurikkal, AVM Ayurveda began with a vision to harness the power of nature and ancient wisdom. Our journey has been one of growth, learning, and unwavering commitment to holistic health.
        </p>
        <p className="text-sm mb-2 text-muted-foreground">
          At AVM Ayurveda, we blend time-honored Ayurvedic practices with modern wellness approaches. Our comprehensive care includes:
        </p>
        <ul className="list-disc list-inside mb-3 text-sm text-muted-foreground">
          <li>Customized Ayurvedic therapies</li>
          <li>Natural herbal remedies</li>
          <li>Mindfulness practices</li>
          <li>Traditional Kalari classes</li>
        </ul>
        <p className="text-sm italic text-muted-foreground">
          With over two decades of expertise, we invite you to experience the transformative power of Ayurveda and embark on a journey towards balanced, vibrant living.
        </p>
      </CardContent>
    </Card>
  );
};

export default OurStory;